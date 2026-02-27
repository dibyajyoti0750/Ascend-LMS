import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    userId: {
      type: String,
      ref: "User",
      required: true,
    },

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

    // Refund consent proof
    agreedToRefundPolicy: {
      type: Boolean,
      required: true,
    },

    refundPolicyAcceptedAt: {
      type: Date,
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

    // Actual payment success timestamp
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Purchase", purchaseSchema);
