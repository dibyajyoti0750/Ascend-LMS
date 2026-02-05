import Stripe from "stripe";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import ExpressError from "../utils/expressError.js";
import CourseProgress from "../models/CourseProgress.js";

// Get user data
export const getUserData = async (req, res) => {
  const { userId } = await req.auth();
  const user = await User.findById(userId);

  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  res.json({ success: true, user });
};

// Get user enrolled courses with lectureUrl
export const userEnrolledCourses = async (req, res) => {
  const { userId } = await req.auth();
  const userData = await User.findById(userId).populate("enrolledCourses");

  res.json({ success: true, enrolledCourses: userData.enrolledCourses });
};

// Purchase course
export const purchaseCourse = async (req, res) => {
  const { courseId } = req.body;
  const { origin } = req.headers;
  const { userId } = await req.auth();
  const userData = await User.findById(userId);
  const courseData = await Course.findById(courseId);

  if (!userData || !courseData) {
    throw new ExpressError(404, "Data not found");
  }

  const purchaseData = {
    courseId: courseData._id,
    userId,
    amount: (
      courseData.coursePrice -
      (courseData.discount * courseData.coursePrice) / 100
    ).toFixed(2),
  };

  const newPurchase = await Purchase.create(purchaseData);

  // initialize stripe gateway
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const currency = "usd";

  // line items for stripe
  const line_items = [
    {
      price_data: {
        currency,
        product_data: {
          name: courseData.courseTitle,
        },
        unit_amount: Math.floor(newPurchase.amount) * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripeInstance.checkout.sessions.create({
    success_url: `${origin}/loading/my-enrollments`,
    cancel_url: `${origin}/`,
    line_items,
    mode: "payment",
    metadata: {
      purchaseId: newPurchase._id.toString(),
    },
  });

  res.json({ success: true, session_url: session.url });
};

// Update user course progress
export const updateUserCourseProgress = async (req, res) => {
  const { userId } = await req.auth();
  const { courseId, lectureId } = req.body;
  const progressData = await CourseProgress.findOne({ userId, courseId });

  if (progressData) {
    if (progressData.lectureCompleted.includes(lectureId)) {
      throw new ExpressError(409, "Lecture already completed"); // The resource exists, but the operation conflicts with its current state.
    }

    progressData.lectureCompleted.push(lectureId);
    await progressData.save();
  } else {
    await CourseProgress.create({
      userId,
      courseId,
      lectureCompleted: [lectureId],
    });
  }

  res.json({ success: true, message: "Progress updated" });
};

// Get user course progress for MyEnrollments
export const getUserCourseProgress = async (req, res) => {
  const { userId } = await req.auth();

  const progressDocs = await CourseProgress.find({ userId }).select(
    "courseId completed lectureCompleted",
  );

  if (!progressDocs) {
    throw new ExpressError(500, "Failed to fetch course progress");
  }

  const progressMap = {};

  progressDocs.forEach((doc) => {
    progressMap[doc.courseId] = {
      lectureCompleted: doc.lectureCompleted,
      completed: doc.completed,
    };
  });

  res.json({ success: true, progressMap });
};

// Get user course progress for a single course
export const getSingleCourseProgress = async (req, res) => {
  const { userId } = await req.auth();
  const { courseId } = req.params;

  if (!courseId) {
    throw new ExpressError(400, "Course ID is required");
  }

  const progressData = await CourseProgress.findOne({
    userId,
    courseId,
  }).select("courseId completed lectureCompleted");

  if (!progressData) {
    throw new ExpressError(404, "Course progress not found");
  }

  res.json({ success: true, progressData });
};

// Add user ratings to course
export const addUserRating = async (req, res) => {
  const { userId } = await req.auth();
  const { courseId, rating } = req.body;

  if (!courseId || !userId || !(rating >= 1 && rating <= 5)) {
    throw new ExpressError(400, "Invalid details");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ExpressError(404, "Course not found");
  }

  const user = await User.findById(userId);

  if (!user || !user.enrolledCourses.includes(courseId)) {
    throw new ExpressError(403, "User has not purchased this course");
  }

  const existingRatingIndex = course.courseRatings.findIndex(
    // findIndex returns: index 0, 1, 2, ... if found -1 if not found
    (r) => r.userId === userId,
  );

  if (existingRatingIndex > -1) {
    course.courseRatings[existingRatingIndex].rating = rating;
  } else {
    course.courseRatings.push({ userId, rating });
  }

  await course.save();

  res.json({ success: true, message: "Rating added" });
};
