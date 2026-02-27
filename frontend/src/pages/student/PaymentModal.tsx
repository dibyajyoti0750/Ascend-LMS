import { useState } from "react";
import { assets } from "../../assets/assets";
import { LoaderCircle } from "lucide-react";

type PaymentMethod = "stripe" | "razorpay";

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  logo: string;
}

interface PaymentModalProps {
  onClose: () => void;
  onContinue: (method: PaymentMethod, agreedToRefundPolicy: boolean) => void;
  paymentProcessing: boolean;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "stripe",
    label: "Pay with Stripe",
    logo: assets.stripeIcon,
  },
  {
    id: "razorpay",
    label: "Pay with Razorpay",
    logo: assets.razorpayIcon,
  },
];

export default function PaymentModal({
  onClose,
  onContinue,
  paymentProcessing,
}: PaymentModalProps) {
  const [selected, setSelected] = useState<PaymentMethod>("stripe");
  const [agreedToRefundPolicy, setAgreedToRefundPolicy] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800">
          Select payment method
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Preferred method with secure transactions.
        </p>

        {/* Options */}
        <div className="mt-6 space-y-4">
          {paymentOptions.map((option) => {
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 transition outline-none cursor-pointer
                ${
                  selected === option.id
                    ? "border border-blue-600 bg-blue-100/70"
                    : "border-gray-300 hover:border-blue-500 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={option.logo}
                    alt={option.label}
                    className="h-6 w-auto"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {option.label}
                  </span>
                </div>

                {selected === option.id && (
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-xs text-white">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <div className="mt-4 rounded-lg bg-gray-50 p-3">
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToRefundPolicy}
                onChange={(e) => setAgreedToRefundPolicy(e.target.checked)}
                className="mt-1 cursor-pointer"
              />
              <span>
                I agree to the{" "}
                <a
                  href="/refund"
                  target="_blank"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Refund Policy
                </a>{" "}
                and understand that course access is non-refundable once
                granted.
              </span>
            </label>
          </div>

          <button
            disabled={paymentProcessing || !agreedToRefundPolicy}
            onClick={() => onContinue(selected, agreedToRefundPolicy)}
            className="w-full rounded-lg bg-linear-to-r from-indigo-500 to-indigo-600 py-3 text-sm font-medium text-white transition hover:opacity-90 active:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paymentProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderCircle size={22} className="animate-spin" />
                Processing...
              </span>
            ) : (
              "Continue"
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-lg bg-white border border-red-100 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
