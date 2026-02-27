import JoinSection from "../../components/student/JoinSection";

export default function RefundPolicy() {
  return (
    <div className="bg-[#131628] text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 leading-relaxed space-y-10 mb-24">
        <h1 className="text-4xl font-bold text-center mb-10">Refund Policy</h1>

        <section className="space-y-4">
          <p className="text-gray-300">
            This Refund Policy outlines the terms under which purchases are made
            on this platform. By purchasing a course, you agree to the terms
            stated below.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Nature of the Product</h2>
          <p className="text-gray-300">
            All courses offered on this platform are digital products. Purchases
            are made as a one-time payment and grant lifetime access to the
            course content, unless the course is removed or deleted by the
            course owner.
          </p>
          <p className="text-gray-300">
            Course videos are hosted on a secure external video platform and are
            embedded within the website for streaming. Videos are available for
            online viewing only and are provided for personal, non-commercial
            use. Downloading, recording, copying, sharing, or redistributing the
            content in any form is strictly prohibited.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. No Refunds After Access Is Granted
          </h2>
          <p className="text-gray-300">
            Due to the digital nature of the courses and instant access granted
            immediately after successful payment, all sales are final. Refunds,
            partial refunds, or exchanges are not provided once access to the
            course has been granted.
          </p>
          <p className="text-gray-300">
            This includes dissatisfaction with content, change of mind, personal
            circumstances, lack of usage, or misunderstanding of course details.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Exceptions for Payment Errors
          </h2>
          <p className="text-gray-300">
            Refunds may be considered only in the following situations:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Duplicate payments for the same course</li>
            <li>
              Failed transactions where payment was deducted but course access
              was not granted
            </li>
            <li>
              Verified technical errors that prevent course delivery after
              successful payment
            </li>
          </ul>
          <p className="text-gray-300">
            In such cases, you must contact support with valid payment details,
            including transaction ID and payment receipt.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Refund Request Process</h2>
          <p className="text-gray-300">
            All refund requests related to payment errors must be submitted
            within 7 days of the transaction date. Requests submitted without
            valid proof of payment may not be processed.
          </p>
          <p className="text-gray-300">
            Approved refunds, if applicable, will be processed through the
            original payment method.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Payment Processing</h2>
          <p className="text-gray-300">
            Payments on this platform are securely processed through third-party
            payment gateways including Razorpay and Stripe. Any temporary
            processing issues caused by the payment gateway may require manual
            verification before resolution.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Contact Information</h2>
          <p className="text-gray-300">
            For any payment-related issues, please contact:
          </p>
          <p className="text-gray-300">
            Email:{" "}
            <a
              href="mailto:dibyajyotipramanick0750@gmail.com"
              className="underline"
            >
              dibyajyotipramanick0750@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-4">
          <p className="text-gray-400 text-sm">
            By purchasing a course on this platform, you acknowledge that you
            have read, understood, and agreed to this Refund Policy.
          </p>
        </section>
      </div>

      <JoinSection />
    </div>
  );
}
