import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "JS Financials Terms of Service. Terms and conditions governing the use of our website, products, and services.",
};

export default function TermsOfServicePage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold text-navy mb-2">
          Terms of Service
        </h1>
        <p className="text-gray-500 text-sm mb-12">
          Last updated: 1 September 2026
        </p>

        <div className="prose prose-navy max-w-none text-gray-700 text-sm leading-relaxed space-y-8">
          {/* 1 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legally
              binding agreement between you (&quot;you&quot;, &quot;your&quot;)
              and JS Financials, operated by Jackson Semenas (ABN 57 226 575 365),
              based in Australia (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
            </p>
            <p>
              By accessing or using our website at jsfinancials.com.au (the
              &quot;Site&quot;), creating an account, purchasing any product or
              service, or participating in the mentorship program, you agree to
              be bound by these Terms. If you do not agree, do not use the Site
              or purchase any products.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years of age to use the Site, create an
              account, or purchase any product or service. By using the Site, you
              represent and warrant that you meet this requirement and have the
              legal capacity to enter into these Terms.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              3. Products and Services
            </h2>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              3.1 Digital Products
            </h3>
            <p>
              We offer digital educational products including, but not limited
              to, online courses, daily macroeconomic reports, research papers,
              community access, and downloadable materials. All products are
              delivered digitally through the Site and member portal.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              3.2 Mentorship Program
            </h3>
            <p>
              The 1-on-1 Mentorship Program is a structured, six-month
              educational program consisting of live calls, curriculum documents,
              and personalised feedback. Enrolment is by application only and
              acceptance is at our sole discretion. The mentorship program is
              governed by these Terms and any additional terms communicated at
              the time of enrolment.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              3.3 Subscription Services
            </h3>
            <p>
              Certain products (including the Daily Macroeconomic Reports and
              the Quantitative Trading Discord) are offered on a recurring
              subscription basis. Subscriptions renew automatically at the end
              of each billing period unless cancelled. You may cancel your
              subscription at any time through the member dashboard or by
              contacting us. Upon cancellation, you retain access until the end
              of the current billing period.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              3.4 Availability
            </h3>
            <p>
              We reserve the right to modify, suspend, or discontinue any
              product or service at any time, with or without notice. We will
              make reasonable efforts to notify affected customers of material
              changes to active subscriptions or ongoing programs.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              4. Accounts
            </h2>
            <p>
              To access purchased products, you must create an account on the
              Site. You are responsible for maintaining the confidentiality of
              your account credentials and for all activity that occurs under
              your account. You agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate and current information when creating your account.</li>
              <li>Notify us immediately of any unauthorised access to your account.</li>
              <li>Not share your account credentials with any third party.</li>
              <li>Not create multiple accounts for the same individual.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account at any
              time if we reasonably believe you have violated these Terms.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              5. Pricing and Payment
            </h2>
            <p>
              All prices are displayed in United States Dollars (USD) unless
              otherwise stated. Prices are subject to change without notice,
              except that price changes will not affect orders or subscriptions
              already in their current billing period.
            </p>
            <p>
              Payments are processed securely through Stripe, Inc. By making a
              purchase, you agree to Stripe&apos;s terms of service. We do not
              store your payment card details.
            </p>
            <p>
              You are responsible for any applicable taxes, duties, or
              government-imposed charges associated with your purchase. If a
              payment fails, we may suspend access to the relevant product until
              the outstanding amount is resolved.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              6. Refund Policy
            </h2>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              6.1 One-Time Purchases (Courses)
            </h3>
            <p>
              Due to the digital nature of our products, all sales of one-time
              purchase courses (including the Prediction Markets Trading Course
              and the Macroeconomics for Financial Markets and Trading Course)
              are final. Refunds are not available once you have accessed the
              course materials.
            </p>
            <p>
              If you have not accessed any course materials, you may request a
              refund within fourteen (14) days of purchase by contacting us at
              hello@jsfinancials.com.au. We will assess each request on a
              case-by-case basis.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              6.2 Subscriptions
            </h3>
            <p>
              Subscription fees are non-refundable for the current billing
              period. You may cancel at any time, and your access will continue
              until the end of the paid period. No partial refunds are issued
              for unused portions of a billing period.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              6.3 Mentorship Program
            </h3>
            <p>
              Due to the personalised nature of the mentorship program and the
              significant resources allocated upon enrolment, mentorship fees
              are non-refundable once the program has commenced. If you wish to
              discuss exceptional circumstances, contact us at
              hello@jsfinancials.com.au.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              6.4 Australian Consumer Law
            </h3>
            <p>
              Nothing in this section excludes, restricts, or modifies any
              consumer guarantee, right, or remedy conferred by the Australian
              Consumer Law (Schedule 2 of the Competition and Consumer Act 2010
              (Cth)) or any other applicable law that cannot be excluded,
              restricted, or modified by agreement.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              7. Intellectual Property
            </h2>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              7.1 Our Content
            </h3>
            <p>
              All content on the Site and within our products, including but not
              limited to curriculum documents, course materials, reports,
              research papers, video recordings, software code, graphics,
              branding, and design elements, is the intellectual property of JS
              Financials and is protected by Australian and international
              copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              7.2 Your Licence
            </h3>
            <p>
              Upon purchase, we grant you a limited, non-exclusive,
              non-transferable, revocable licence to access and use the
              purchased materials for your personal, non-commercial educational
              purposes only. This licence does not include the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Copy, reproduce, distribute, or publicly display any materials.</li>
              <li>Share, resell, sublicense, or make available any materials to third parties.</li>
              <li>Modify, create derivative works from, or reverse-engineer any materials.</li>
              <li>Use any materials for commercial purposes, including training competing products or services.</li>
              <li>Remove or alter any copyright, trademark, or proprietary notices.</li>
            </ul>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              7.3 Your Submissions
            </h3>
            <p>
              You retain ownership of any original work you submit through the
              mentorship submission system (code, notebooks, strategy write-ups).
              By submitting work, you grant us a non-exclusive, royalty-free
              licence to view, store, and provide feedback on that work for the
              purposes of the mentorship program. We will not share, publish, or
              use your submissions for any purpose outside of the mentorship
              engagement without your explicit consent.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              8. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the Site or any product in a manner that violates any applicable law or regulation.</li>
              <li>Attempt to gain unauthorised access to any part of the Site, member portal, or other accounts.</li>
              <li>Interfere with or disrupt the integrity or performance of the Site or its infrastructure.</li>
              <li>Scrape, crawl, or use automated tools to extract content from the Site.</li>
              <li>Share your account credentials or allow others to access your account.</li>
              <li>Upload malicious files, viruses, or harmful code through the submission system.</li>
              <li>Use the AI chat assistant to generate content that is harmful, illegal, or abusive.</li>
              <li>Misrepresent your identity or affiliation in any communication with us.</li>
            </ul>
          </div>

          {/* 9 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              9. Financial Disclaimer
            </h2>
            <p>
              <strong>
                JS Financials provides financial education only. We are not a
                licensed financial adviser, broker, dealer, or investment
                manager.
              </strong>
            </p>
            <p>
              Nothing on the Site, in our products, or communicated during the
              mentorship program constitutes personal financial advice,
              investment advice, a recommendation to buy or sell any financial
              instrument, or a solicitation to engage in any financial
              transaction.
            </p>
            <p>
              All content is provided for general educational and informational
              purposes only. Trading and investing in financial markets involves
              substantial risk of loss. Past performance is not indicative of
              future results. You are solely responsible for your own trading
              and investment decisions.
            </p>
            <p>
              You should seek independent professional financial advice before
              making any investment decision. We do not guarantee any specific
              outcome, return, or profit from the use of our products or
              services.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              10. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, JS Financials,
              its owner, employees, and contractors shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits, revenue, data, or goodwill, arising out of
              or in connection with:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your use of or inability to use the Site or any product.</li>
              <li>Any trading or investment decisions you make based on our content.</li>
              <li>Any unauthorised access to or alteration of your data.</li>
              <li>Any interruption, suspension, or termination of any service.</li>
              <li>Any errors, omissions, or inaccuracies in our content.</li>
            </ul>
            <p>
              Our total aggregate liability to you for all claims arising out of
              or in connection with these Terms shall not exceed the total amount
              you have paid to us in the twelve (12) months preceding the claim.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot be
              excluded or limited under applicable law, including liability for
              fraud, death or personal injury caused by negligence, or any
              liability arising under the Australian Consumer Law that cannot be
              excluded by agreement.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              11. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless JS Financials,
              its owner, employees, and contractors from and against any claims,
              damages, losses, liabilities, costs, and expenses (including
              reasonable legal fees) arising out of or in connection with:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your breach of these Terms.</li>
              <li>Your use of the Site or any product.</li>
              <li>Your violation of any applicable law or regulation.</li>
              <li>Your infringement of any third-party right.</li>
            </ul>
          </div>

          {/* 12 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              12. Third-Party Services and Links
            </h2>
            <p>
              The Site may contain links to third-party websites, services, or
              content that are not owned or controlled by us. We are not
              responsible for the content, privacy practices, or terms of any
              third-party service. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Stripe (payment processing)</li>
              <li>Discord (community platform)</li>
              <li>Calendly (scheduling)</li>
              <li>YouTube and Loom (video content)</li>
              <li>Kalshi (prediction markets platform, affiliate link)</li>
            </ul>
            <p>
              Your use of any third-party service is governed by that
              service&apos;s own terms and policies. The inclusion of any link
              does not imply endorsement or affiliation unless explicitly stated.
            </p>
          </div>

          {/* 13 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              13. Affiliate Disclosures
            </h2>
            <p>
              The Site may contain affiliate links. Where we link to a
              third-party product or service using an affiliate link, we may
              earn a commission if you make a purchase through that link. This
              does not affect the price you pay. Affiliate relationships are
              disclosed where they occur. We only recommend products and
              services that we believe are relevant to our audience.
            </p>
          </div>

          {/* 14 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              14. Termination
            </h2>
            <p>
              We may terminate or suspend your access to the Site and any
              products or services immediately, without prior notice or
              liability, if you breach any provision of these Terms.
            </p>
            <p>
              Upon termination, your right to use the Site and access purchased
              products ceases immediately, except where applicable law requires
              otherwise. Sections of these Terms that by their nature should
              survive termination (including intellectual property, limitation of
              liability, indemnification, and governing law) shall continue to
              apply.
            </p>
          </div>

          {/* 15 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              15. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of the Australian Capital Territory, Australia. Any disputes
              arising out of or in connection with these Terms shall be subject
              to the exclusive jurisdiction of the courts of the Australian
              Capital Territory, Australia.
            </p>
          </div>

          {/* 16 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              16. Severability
            </h2>
            <p>
              If any provision of these Terms is found to be invalid,
              unenforceable, or illegal by a court of competent jurisdiction,
              the remaining provisions shall continue in full force and effect.
              The invalid provision shall be modified to the minimum extent
              necessary to make it valid and enforceable while preserving its
              original intent.
            </p>
          </div>

          {/* 17 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              17. Entire Agreement
            </h2>
            <p>
              These Terms, together with our{" "}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>
              , constitute the entire agreement between you and JS Financials
              with respect to the use of the Site and the purchase of products
              and services. These Terms supersede all prior agreements,
              representations, and understandings, whether written or oral.
            </p>
          </div>

          {/* 18 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              18. Changes to These Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms at any time.
              When we make material changes, we will update the &quot;Last
              updated&quot; date at the top of this page. Your continued use of
              the Site after any changes constitutes acceptance of the updated
              Terms. We encourage you to review these Terms periodically.
            </p>
          </div>

          {/* 19 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              19. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us:
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
        </div>
      </div>
    </section>
  );
}
