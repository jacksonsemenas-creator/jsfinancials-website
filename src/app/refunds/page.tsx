import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "JS Financials Refund Policy. Our refund terms for courses, subscriptions, and the mentorship program.",
};

export default function RefundPolicyPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold text-navy mb-2">
          Refund Policy
        </h1>
        <p className="text-gray-500 text-sm mb-12">
          Last updated: 1 September 2026
        </p>

        <div className="prose prose-navy max-w-none text-gray-700 text-sm leading-relaxed space-y-8">
          {/* 1 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              1. Overview
            </h2>
            <p>
              JS Financials, operated by Jackson Semenas (ABN 57 226 575 365),
              sells digital educational products and services. Because our
              products are delivered digitally and access is granted
              immediately upon purchase, our refund terms differ by product
              type. This policy applies to all purchases made through
              jsfinancials.com.au.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              2. One-Time Purchase Courses
            </h2>
            <p>
              This section applies to the following products:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Prediction Markets Trading Course</li>
              <li>Macroeconomics for Financial Markets and Trading Course</li>
            </ul>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              2.1 Before Accessing Materials
            </h3>
            <p>
              If you have not accessed, downloaded, or viewed any course
              materials, you may request a full refund within fourteen (14) days
              of the date of purchase. To request a refund, email
              hello@jsfinancials.com.au with your name, the email address used
              at checkout, and the product purchased.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              2.2 After Accessing Materials
            </h3>
            <p>
              Once you have accessed any course materials (including logging
              into the member portal and viewing or downloading any document),
              the purchase is considered final and a refund is not available.
              This is because digital products cannot be returned once
              delivered.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              2.3 Duplicate Purchases
            </h3>
            <p>
              If you have been charged twice for the same product due to a
              technical error, contact us immediately and we will issue a full
              refund for the duplicate charge.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              3. Subscription Products
            </h2>
            <p>
              This section applies to the following products:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Daily Macroeconomic Reports (monthly or annual)</li>
              <li>Quantitative Trading Discord (monthly)</li>
            </ul>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              3.1 Cancellation
            </h3>
            <p>
              You may cancel your subscription at any time. Cancellation can be
              done through the member dashboard (for Daily Reports) or by
              contacting us at hello@jsfinancials.com.au. Upon cancellation, you
              retain access to the product until the end of your current billing
              period. No further charges will be applied after cancellation.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              3.2 No Partial Refunds
            </h3>
            <p>
              Subscription fees are charged in advance for each billing period.
              We do not issue partial refunds for unused portions of a billing
              period. If you cancel on day 5 of a 30-day billing period, you
              retain access for the remaining 25 days but no refund is issued
              for that period.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              3.3 Annual Subscriptions
            </h3>
            <p>
              Annual subscription payments are non-refundable once the
              subscription period has commenced. If you wish to cancel an annual
              subscription, you retain access until the end of the annual period
              and the subscription will not renew.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              3.4 Failed Payments
            </h3>
            <p>
              If a subscription payment fails, we will attempt to collect the
              payment automatically. You will receive an email notification with
              a link to pay the outstanding invoice. If payment is not resolved,
              access to the subscription product may be suspended.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              4. 1-on-1 Mentorship Program
            </h2>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              4.1 Before Program Commencement
            </h3>
            <p>
              If you have been accepted into the mentorship program but the
              program has not yet commenced (no calls have taken place and no
              personalised materials have been delivered), you may request a
              full refund within fourteen (14) days of payment.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              4.2 After Program Commencement
            </h3>
            <p>
              Once the mentorship program has commenced (defined as the first
              scheduled call taking place or personalised curriculum materials
              being delivered), the fee is non-refundable. This is because
              significant resources, time, and personalised content are
              allocated to each client upon commencement.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              4.3 Exceptional Circumstances
            </h3>
            <p>
              We understand that unforeseen circumstances can arise. If you
              are unable to continue the mentorship program due to exceptional
              circumstances (serious illness, family emergency, or similar),
              contact us at hello@jsfinancials.com.au to discuss options. These
              may include pausing the program, rescheduling, or a partial
              credit toward future services. Each case is assessed
              individually.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              5. How to Request a Refund
            </h2>
            <p>
              To request a refund, send an email to{" "}
              <a href="mailto:hello@jsfinancials.com.au" className="text-gold hover:underline">
                hello@jsfinancials.com.au
              </a>{" "}
              with the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your full name.</li>
              <li>The email address used at checkout.</li>
              <li>The product or service you are requesting a refund for.</li>
              <li>The date of purchase.</li>
              <li>The reason for your refund request.</li>
            </ul>
            <p>
              We will acknowledge your request within two (2) business days
              and process eligible refunds within seven (7) business days of
              approval. Refunds are issued to the original payment method via
              Stripe.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              6. Chargebacks
            </h2>
            <p>
              If you believe a charge is unauthorised or incorrect, please
              contact us at hello@jsfinancials.com.au before initiating a
              chargeback with your bank or card issuer. We are committed to
              resolving disputes directly and promptly. Filing a chargeback
              without first contacting us may result in the suspension of your
              account and access to all products and services.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              7. Australian Consumer Law
            </h2>
            <p>
              Our products and services come with guarantees that cannot be
              excluded under the Australian Consumer Law (Schedule 2 of the
              Competition and Consumer Act 2010 (Cth)). Nothing in this Refund
              Policy excludes, restricts, or modifies any right or remedy, or
              any guarantee, condition, or warranty, implied or imposed by any
              legislation that cannot lawfully be excluded or limited.
            </p>
            <p>
              If our products or services fail to meet a consumer guarantee,
              you may be entitled to a remedy including a refund, replacement,
              or compensation, regardless of the terms stated above. For more
              information about your rights under the Australian Consumer Law,
              visit the{" "}
              <a href="https://www.accc.gov.au" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                Australian Competition and Consumer Commission (ACCC)
              </a>
              .
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Refund Policy from time to time. When we make
              changes, we will update the &quot;Last updated&quot; date at the
              top of this page. Changes do not apply retroactively to purchases
              made before the updated policy took effect.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              9. Contact Us
            </h2>
            <p>
              For any questions about this Refund Policy or to submit a refund
              request:
            </p>
            <ul className="list-none space-y-1 mt-3">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:hello@jsfinancials.com.au" className="text-gold hover:underline">
                  hello@jsfinancials.com.au
                </a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a href="https://jsfinancials.com.au/contact" className="text-gold hover:underline">
                  jsfinancials.com.au/contact
                </a>
              </li>
            </ul>
          </div>

          {/* Related policies */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-500 text-xs">
              This Refund Policy should be read together with our{" "}
              <Link href="/terms" className="text-gold hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
