import JoinSection from "../../components/student/JoinSection";

export default function TermsConditions() {
  return (
    <div className="bg-[#131628] text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 leading-relaxed space-y-10 mb-24">
        <h1 className="text-4xl font-bold text-center mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-400 text-sm text-center mb-12">
          Last Updated: February 27, 2026
        </p>

        {/* 1. Acceptance of Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By accessing or using this platform, you agree to be legally bound
            by these Terms & Conditions. If you do not agree with any part of
            these terms, you must not use the website or purchase any courses.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Eligibility</h2>
          <p className="text-gray-300">
            You must be at least 13 years old to use this platform. By creating
            an account, you represent that the information you provide is
            accurate and complete.
          </p>
        </section>

        {/* 3. User Accounts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. User Accounts</h2>
          <p className="text-gray-300">
            To access certain features, you must create an account. You are
            responsible for maintaining the confidentiality of your login
            credentials and for all activities that occur under your account.
          </p>
          <p className="text-gray-300">
            We reserve the right to suspend or terminate accounts that violate
            these Terms.
          </p>
        </section>

        {/* 4. Course Access and License */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Course Access and License
          </h2>
          <p className="text-gray-300">
            Upon successful payment, you are granted a limited, non-exclusive,
            non-transferable license to access and view the purchased course
            content for personal, non-commercial use.
          </p>
          <p className="text-gray-300">
            Lifetime access is provided unless the course is removed, updated,
            or discontinued at our discretion.
          </p>
        </section>

        {/* 5. Intellectual Property */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Intellectual Property Rights
          </h2>
          <p className="text-gray-300">
            All course materials, including videos, text, graphics, branding,
            and website content, are the intellectual property of the platform
            owner unless otherwise stated.
          </p>
          <p className="text-gray-300">
            You may not reproduce, distribute, modify, publicly display, resell,
            share, or exploit any content without prior written permission.
          </p>
        </section>

        {/* 6. Prohibited Conduct */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Prohibited Conduct</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Sharing account credentials with others</li>
            <li>Downloading, recording, or redistributing course content</li>
            <li>Attempting to bypass security or payment systems</li>
            <li>Using the platform for unlawful purposes</li>
            <li>
              Uploading malicious code or interfering with platform operations
            </li>
          </ul>
        </section>

        {/* 7. Payments and Pricing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Payments and Pricing</h2>
          <p className="text-gray-300">
            All prices are listed on the platform and are subject to change at
            any time without prior notice.
          </p>
          <p className="text-gray-300">
            Payments are processed securely through third-party payment
            providers. We do not store your card or banking details.
          </p>
        </section>

        {/* 8. Refund Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Refund Policy</h2>
          <p className="text-gray-300">
            All purchases are subject to our{" "}
            <a href="/refund" className="underline">
              Refund Policy
            </a>
            . Due to the digital nature of the courses, refunds are not provided
            after access has been granted, except in limited cases of verified
            payment errors.
          </p>
        </section>

        {/* 9. Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Limitation of Liability</h2>
          <p className="text-gray-300">
            The platform and its content are provided on an "as is" and "as
            available" basis. We do not guarantee uninterrupted access,
            error-free functionality, or specific results from course usage.
          </p>
          <p className="text-gray-300">
            To the maximum extent permitted by law, we shall not be liable for
            any indirect, incidental, or consequential damages arising from your
            use of the platform.
          </p>
        </section>

        {/* 10. Termination */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Termination</h2>
          <p className="text-gray-300">
            We reserve the right to suspend or terminate access to the platform
            at our discretion if a user violates these Terms.
          </p>
        </section>

        {/* 11. Modifications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Changes to These Terms</h2>
          <p className="text-gray-300">
            We may update these Terms & Conditions from time to time. Continued
            use of the platform after changes are posted constitutes acceptance
            of the revised terms.
          </p>
        </section>

        {/* 12. Governing Law */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Governing Law</h2>
          <p className="text-gray-300">
            These Terms shall be governed and interpreted in accordance with the
            laws of India. Any disputes arising under these Terms shall be
            subject to the exclusive jurisdiction of the courts located in
            India.
          </p>
        </section>

        {/* 13. Contact */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Contact Information</h2>
          <p className="text-gray-300">
            If you have any questions regarding these Terms & Conditions, please
            contact:
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
          <p className="text-gray-300">Location: India</p>
        </section>
      </div>

      <JoinSection />
    </div>
  );
}
