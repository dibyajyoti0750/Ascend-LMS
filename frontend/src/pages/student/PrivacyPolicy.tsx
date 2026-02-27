import JoinSection from "../../components/student/JoinSection";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#131628] text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 leading-relaxed space-y-10 mb-24">
        <h1 className="text-4xl font-bold text-center mb-10">Privacy Policy</h1>

        <p className="text-gray-400 text-sm mb-8">
          Last Updated: February 27, 2026
        </p>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to our platform. We value your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, store, and safeguard your data when you use our
            website and services.
          </p>
          <p>
            By accessing or using our platform, you agree to the practices
            described in this policy.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>

          {/* Account Information */}
          <div>
            <h3 className="text-xl font-medium mb-2">Account Information</h3>

            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Full name</li>
              <li>Email address</li>
              <li>Profile image</li>
              <li>Enrolled courses</li>
            </ul>

            <p className="text-gray-300 mt-4">
              We use Clerk for authentication and account management. When you
              create an account or log in, your name and email address are
              processed by Clerk. We do not store passwords on our servers.
            </p>

            <p className="text-gray-300 mt-2">
              For more information, please review{" "}
              <a href="https://clerk.com/legal/privacy" className="underline">
                Clerk's Privacy Policy.
              </a>
            </p>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-xl font-medium mb-2">Payment Information</h3>

            <p className="text-gray-300">
              Payments are processed securely through third-party payment
              providers including Razorpay (for domestic transactions) and
              Stripe (for international transactions). We do not store or
              process your credit card, debit card, or banking information.
            </p>

            <p className="text-gray-300 mt-2">
              For record-keeping and support purposes, we store limited
              transaction details such as payment amount, currency, exchange
              rate (if applicable), transaction identifiers, payment gateway
              used, and payment status.
            </p>
          </div>

          {/* Platform Data */}
          <div>
            <h3 className="text-xl font-medium mb-2">Platform Data</h3>

            <p className="text-gray-300">
              To provide course access and track learning progress, we store the
              following platform-related information:
            </p>

            <ul className="list-disc pl-6 space-y-1 text-gray-300 mt-3">
              <li>Enrollment history</li>
              <li>Course progress and lecture completion status</li>
              <li>Purchase history</li>
              <li>Course ratings submitted by users</li>
            </ul>
          </div>

          {/* Technical Data */}
          <div>
            <h3 className="text-xl font-medium mb-2">Technical Information</h3>

            <p className="text-gray-300">
              We do not independently collect analytics data such as IP address,
              browser type, device information, or browsing activity.
            </p>

            <p className="text-gray-300 mt-2">
              However, third-party service providers such as Clerk and our
              payment gateways may use cookies or similar technologies as
              necessary to deliver their services.
            </p>
          </div>
        </section>

        {/* Embedded content from other websites */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Embedded Content from Third-Party Platforms
          </h2>
          <p className="text-gray-300">
            All course videos available on our platform are hosted on YouTube
            and embedded into our website. When you view or interact with these
            videos, YouTube may collect certain information such as your IP
            address, device details, and usage data in accordance with its own
            privacy policy.
          </p>
          <p className="text-gray-300">
            We do not control how YouTube collects or processes data. We
            encourage users to review YouTube's privacy policy for more
            information.
          </p>
        </section>

        {/* How We Use Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. How We Use Your Information
          </h2>

          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Create and manage user accounts</li>
            <li>Provide access to purchased courses</li>
            <li>Process payments and manage enrollments</li>
            <li>Maintain transaction records for accounting and compliance</li>
            <li>Track course progress and learning activity</li>
            <li>Provide customer support</li>
            <li>Improve and maintain platform functionality</li>
            <li>Prevent fraud, abuse, and unauthorized access</li>
          </ul>

          <p className="text-gray-300 mt-3">
            We do not sell, rent, or trade your personal information to third
            parties. However, we may share limited information with trusted
            third-party service providers who help us operate our platform, such
            as authentication and payment processing services.
          </p>
        </section>

        {/* Data Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p className="text-gray-300">
            We implement appropriate security measures to protect your data,
            including secure authentication systems provided by trusted
            third-party services, restricted database access, and HTTPS
            connections.
          </p>
          <p className="text-gray-300">
            Authentication credentials are securely processed and managed by our
            authentication provider in accordance with industry standards.
          </p>
          <p className="text-gray-300">
            While we strive to use commercially acceptable means to protect your
            information, no method of transmission over the internet is
            completely secure.
          </p>
        </section>

        {/* Third Party Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Third-Party Services</h2>
          <p className="text-gray-300">
            We use trusted third-party service providers to operate our
            platform, including authentication and payment processing services.
            These providers may process limited personal information as
            necessary to deliver their services and are governed by their own
            privacy policies.
          </p>
          <p className="text-gray-300">
            When you contact us, your message may be processed through secure
            email service providers to enable communication and support. We do
            not use email services for promotional or marketing purposes.
          </p>
        </section>

        {/* Data Retention */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Data Retention</h2>
          <p className="text-gray-300">
            We retain your personal information for as long as your account
            remains active or as necessary to comply with legal obligations and
            legitimate business purposes.
          </p>
          <p className="text-gray-300">
            You may request account deletion at any time by{" "}
            <a href="/contact" className="underline">
              contacting us.
            </a>
          </p>
        </section>

        {/* User Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent where applicable</li>
          </ul>
          <p className="text-gray-300">
            To exercise these rights, please contact us at:
            support@yourdomain.com
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Children's Privacy</h2>
          <p className="text-gray-300">
            Our platform is not intended for children under the age of 13. We do
            not knowingly collect personal information from minors.
          </p>
        </section>

        {/* Policy Updates */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Updates to This Policy</h2>
          <p className="text-gray-300">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with a revised effective date.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions regarding this Privacy Policy, you may
            contact us at:
          </p>
          <p className="text-gray-300">
            Email:{" "}
            <a
              href="mailto:dibyajyotipramanick0750@gmail.com"
              className="hover:underline"
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
