import Purchase from "../models/Purchase.js";

export const getPurchaseReceipt = async (req, res) => {
  const { purchaseId } = req.params;
  const { userId } = await req.auth();

  const purchase = await Purchase.findById(purchaseId).populate(
    "courseId",
    "courseTitle",
  );

  if (!purchase) {
    throw new ExpressError(404, "Receipt not found");
  }

  // SECURITY CHECK
  if (purchase.userId.toString() !== userId) {
    throw new ExpressError(403, "Unauthorized access");
  }

  if (purchase.status !== "completed") {
    throw new ExpressError(400, "Payment not completed");
  }

  const isRazorpay = purchase.paymentGateway === "razorpay";

  const receipt = {
    provider: purchase.paymentGateway,
    paymentId: purchase.paymentId,
    orderId: purchase.orderId,
    amount: isRazorpay ? purchase.inrAmount : purchase.usdAmount,
    currency: isRazorpay ? "INR" : "USD",
    status: purchase.status,
    paidAt: purchase.paidAt,
    courseTitle: purchase.courseId.courseTitle,
  };

  res.status(200).json({
    success: true,
    receipt,
  });
};
