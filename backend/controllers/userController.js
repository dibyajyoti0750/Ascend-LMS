import Stripe from "stripe";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import ExpressError from "../utils/expressError.js";

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
