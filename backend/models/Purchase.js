import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    userId: { type: String, ref: "User", required: true },

    usdAmount: {
      type: Number,
      required: true,
    },

    inrAmount: {
      type: Number,
    },

    exchangeRate: {
      type: Number,
    },

    paymentGateway: {
      type: String,
      enum: ["stripe", "razorpay"],
      required: true,
    },

    // Gateway specific IDs
    orderId: String,
    paymentId: String,

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Purchase", purchaseSchema);
