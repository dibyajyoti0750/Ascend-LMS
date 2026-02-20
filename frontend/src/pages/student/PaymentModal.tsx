import { useState } from "react";
import { assets } from "../../assets/assets";

type PaymentMethod = "stripe" | "razorpay";

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  logo: string;
}

interface PaymentModalProps {
  onClose: () => void;
  onContinue: (method: PaymentMethod) => void;
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
}: PaymentModalProps) {
  const [selected, setSelected] = useState<PaymentMethod>("razorpay");

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
          <button
            onClick={() => onContinue(selected)}
            className="w-full rounded-lg bg-linear-to-r from-indigo-500 to-indigo-600 py-3 text-sm font-medium text-white transition hover:opacity-90 active:opacity-90 cursor-pointer"
          >
            Continue
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-lg bg-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-300 transition cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
