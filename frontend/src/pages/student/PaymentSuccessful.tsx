import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface Receipt {
  provider: "razorpay" | "stripe";
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  paidAt: string;
  courseTitle: string;
}

export default function PaymentSuccessful() {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [countdown, setCountdown] = useState(7);
  const { receiptId } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const token = await getToken();

        const { data } = await axios.get(
          `${backendUrl}/api/purchase/${receiptId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setReceipt(data.receipt);
        toast.success("Payment successful");
      } catch (error: unknown) {
        let msg = "Something went wrong";

        if (axios.isAxiosError(error)) {
          msg = error.response?.data?.message || error.message || msg;
        } else if (error instanceof Error) {
          msg = error.message;
        }

        toast.error(msg);
      }
    };

    if (receiptId) fetchReceipt();
  }, [receiptId, backendUrl, getToken]);

  useEffect(() => {
    if (!receipt) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/my-enrollments");
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [receipt, navigate]);

  if (!receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-sm">Loading receipt...</p>
      </div>
    );
  }

  const formattedAmount = `${receipt.currency} ${receipt.amount.toFixed(2)}`;
  const formattedDate = new Date(receipt.paidAt).toLocaleString("IN");

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-32">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-semibold">Payment Confirmed</h1>
              <p className="text-sm text-green-100">
                You are now enrolled in "{receipt.courseTitle}"
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {/* Amount */}
          <div className="text-center border-b border-dashed border-gray-400 pb-6">
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formattedAmount}
            </p>

            {/* Redirect Info */}
            <p className="mt-4 text-sm text-black bg-gray-50 border border-gray-200 inline-block px-4 py-1.5 rounded">
              Redirecting in <span className="font-bold">{countdown}s...</span>{" "}
              Please wait
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4 text-sm">
            <ReceiptRow label="Course" value={receipt.courseTitle} />
            <ReceiptRow label="Payment ID" value={receipt.paymentId} />
            <ReceiptRow label="Order ID" value={receipt.orderId} />
            <ReceiptRow
              label="Gateway"
              value={receipt.provider === "razorpay" ? "Razorpay" : "Stripe"}
            />
            <ReceiptRow label="Status" value="Successful" />
            <ReceiptRow label="Date" value={formattedDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-800 font-medium text-right break-all max-w-[60%]">
        {value || "-"}
      </span>
    </div>
  );
}
