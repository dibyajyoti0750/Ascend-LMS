import Stripe from "stripe";
import { Webhook } from "svix";
import crypto from "crypto";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";
import ExpressError from "../utils/expressError.js";

// Function to manage clerk user with DB
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: [data.first_name, data.last_name].filter(Boolean).join(" "),
          imageUrl: data.image_url,
        };

        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: [data.first_name, data.last_name].filter(Boolean).join(" "),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        break;
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

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
