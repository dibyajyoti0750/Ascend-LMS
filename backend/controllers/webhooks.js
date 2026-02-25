import { Webhook } from "svix";
import Stripe from "stripe";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";

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

// Stripe webhooks
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      // SUCCESS CASE
      case "checkout.session.completed": {
        const session = event.data.object;
        const purchaseId = session.metadata?.purchaseId;

        if (!purchaseId) break;

        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) break;

        // Idempotency check
        if (purchaseData.status === "completed") break;

        const user = await User.findById(purchaseData.userId);
        const course = await Course.findById(purchaseData.courseId);

        if (!user || !course) break;

        // addToSet adds a value to an array only if it doesn’t already exist
        await Course.findByIdAndUpdate(course._id, {
          $addToSet: { enrolledStudents: user._id },
        });

        await User.findByIdAndUpdate(user._id, {
          $addToSet: { enrolledCourses: course._id },
        });

        purchaseData.status = "completed";
        purchaseData.orderId = session.id;
        purchaseData.paymentId = session.payment_intent;
        await purchaseData.save();

        break;
      }

      // FAILURE CASE (for async payments)
      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        const purchaseId = session.metadata?.purchaseId;

        if (!purchaseId) break;

        await Purchase.findByIdAndUpdate(purchaseId, {
          status: "failed",
        });

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Internal webhook error" });
  }
};
