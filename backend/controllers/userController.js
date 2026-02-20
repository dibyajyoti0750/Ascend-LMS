import crypto from "crypto";
import Razorpay from "razorpay";
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

  res.status(200).json({ success: true, user });
};

// Get user enrolled courses with lectureUrl
export const userEnrolledCourses = async (req, res) => {
  const { userId } = await req.auth();
  const userData = await User.findById(userId).populate("enrolledCourses");

  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res
    .status(200)
    .json({ success: true, enrolledCourses: userData.enrolledCourses });
};

// Purchase course Razorpay
export const purchaseCourseRZP = async (req, res) => {
  const { courseId } = req.body;
  const { userId } = await req.auth();

  const userData = await User.findById(userId);
  const courseData = await Course.findById(courseId);

  if (!userData || !courseData) {
    throw new ExpressError(404, "Data not found");
  }

  const finalAmount =
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100;

  // create a record in our database first
  const newPurchase = new Purchase({
    courseId: courseData._id,
    userId,
    amount: finalAmount,
    status: "pending",
  });

  await newPurchase.save();

  // initialize razorpay
  const razorpayInstance = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET,
  });

  const options = {
    amount: Math.round(finalAmount * 100), // paisa
    currency: "INR",
    receipt: `receipt_${newPurchase._id}`,
    notes: {
      purchaseId: newPurchase._id.toString(),
    },
  };

  const order = await razorpayInstance.orders.create(options);

  res.json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    key: process.env.RZP_KEY_ID,
    purchaseId: newPurchase._id,
  });
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    purchaseId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    await Purchase.findByIdAndUpdate(purchaseId, {
      status: "failed",
    });
    throw new ExpressError(400, "Invalid signature");
  }

  const purchaseData = await Purchase.findById(purchaseId);
  const userData = await User.findById(purchaseData.userId);
  const courseData = await Course.findById(purchaseData.courseId);

  // enroll student
  courseData.enrolledStudents.push(userData._id);
  await courseData.save();

  userData.enrolledCourses.push(courseData._id);
  await userData.save();

  purchaseData.status = "completed";
  purchaseData.paymentId = razorpay_payment_id;
  await purchaseData.save();

  res.json({ success: true });
};

// Purchase course Stripe
export const purchaseCourseStripe = async (req, res) => {
  const { origin } = req.headers;
  const { courseId } = req.body;
  const { userId } = await req.auth();

  const userData = await User.findById(userId);
  const courseData = await Course.findById(courseId);

  if (!userData || !courseData) {
    throw new ExpressError(404, "Data not found");
  }

  // prevent duplicate completed purchase
  const existingPurchase = await Purchase.findOne({
    userId,
    courseId,
    status: "completed",
  });

  if (existingPurchase) {
    throw new ExpressError(400, "Course already purchased");
  }

  const finalAmount =
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100;

  // create purchase with pending status
  const newPurchase = await Purchase.create({
    courseId: courseData._id,
    userId,
    amount: finalAmount,
    status: "pending",
  });

  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripeInstance.checkout.sessions.create({
    success_url: `${origin}/loading/my-enrollments`,
    cancel_url: `${origin}/`,
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.round(finalAmount * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      purchaseId: newPurchase._id.toString(),
    },
  });

  res.status(200).json({
    success: true,
    session_url: session.url,
  });
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

  res.status(200).json({ success: true, message: "Progress updated" });
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

  res.status(200).json({ success: true, progressMap });
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

  res.status(200).json({ success: true, progressData });
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

  res.status(200).json({ success: true, message: "Rating added" });
};
