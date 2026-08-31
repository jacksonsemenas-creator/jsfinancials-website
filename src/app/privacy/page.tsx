import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "JS Financials Privacy Policy. How we collect, use, store, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold text-navy mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm mb-12">
          Last updated: 1 September 2026
        </p>

        <div className="prose prose-navy max-w-none text-gray-700 text-sm leading-relaxed space-y-8">
          {/* 1 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              1. Introduction
            </h2>
            <p>
              JS Financials (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is
              operated by Jackson Semenas (ABN 57 226 575 365), based in Australia. This
              Privacy Policy explains how we collect, use, disclose, and protect
              personal information when you visit our website at
              jsfinancials.com.au (the &quot;Site&quot;), use our member portal,
              purchase our products, or interact with us through any channel.
            </p>
            <p>
              We are bound by the Australian Privacy Principles (&quot;APPs&quot;)
              under the Privacy Act 1988 (Cth). Where we process personal data of
              individuals located in the European Economic Area (&quot;EEA&quot;)
              or the United Kingdom (&quot;UK&quot;), we also comply with the
              General Data Protection Regulation (&quot;GDPR&quot;) and the UK
              GDPR respectively. Where we process personal data of California
              residents, we comply with the California Consumer Privacy Act
              (&quot;CCPA&quot;).
            </p>
            <p>
              By accessing the Site or purchasing any product or service, you
              acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              2. Information We Collect
            </h2>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              2.1 Information You Provide Directly
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Account information:</strong> name, email address, and
                password when you create a member account or are invited to the
                mentorship portal.
              </li>
              <li>
                <strong>Purchase information:</strong> name, email address, and
                billing details when you purchase a product. Payment card details
                are collected and processed exclusively by our payment processor,
                Stripe, Inc., and are never stored on our servers.
              </li>
              <li>
                <strong>Contact form submissions:</strong> name, email address,
                subject, and message content when you use the contact form.
              </li>
              <li>
                <strong>Intake form submissions:</strong> personal and
                professional information you provide when completing a client
                intake form for the mentorship program.
              </li>
              <li>
                <strong>Mentorship submissions:</strong> files, code, notebooks,
                and written content you upload through the mentorship submission
                system.
              </li>
              <li>
                <strong>Chat interactions:</strong> messages you send through the
                AI assistant embedded on the Site.
              </li>
              <li>
                <strong>Newsletter signup:</strong> email address when you
                subscribe to receive communications from us.
              </li>
            </ul>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              2.2 Information Collected Automatically
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Analytics data:</strong> we use Vercel Analytics to
                collect anonymised, aggregated data about page views, visitor
                counts, referral sources, and device types. Vercel Analytics does
                not use cookies and does not collect personally identifiable
                information.
              </li>
              <li>
                <strong>Authentication cookies:</strong> when you log in to the
                member portal, we set session cookies via Supabase Auth to
                maintain your authenticated session. These are strictly necessary
                functional cookies and are not used for tracking or advertising.
              </li>
              <li>
                <strong>Server logs:</strong> our hosting provider (Vercel, Inc.)
                may collect standard server log data including IP addresses, browser
                type, and request timestamps. This data is retained by Vercel in
                accordance with their privacy policy.
              </li>
            </ul>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              2.3 Information from Third Parties
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Stripe:</strong> when you complete a purchase, Stripe
                provides us with your name, email address, and transaction
                details (but not your full card number).
              </li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              3. How We Use Your Information
            </h2>
            <p>We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Service delivery:</strong> to provide access to purchased
                products, courses, reports, the mentorship portal, and the member
                dashboard.
              </li>
              <li>
                <strong>Account management:</strong> to create, maintain, and
                secure your account, including password resets and session
                management.
              </li>
              <li>
                <strong>Payment processing:</strong> to process transactions,
                issue invoices, handle refunds, and manage subscription billing
                through Stripe.
              </li>
              <li>
                <strong>Communication:</strong> to send transactional emails
                (purchase confirmations, password resets, submission review
                notifications, overdue invoice notices), and, where you have
                opted in, marketing communications.
              </li>
              <li>
                <strong>Mentorship administration:</strong> to manage your
                mentorship enrolment, track your progress, provide feedback on
                submissions, log session notes, and deliver personalised content.
              </li>
              <li>
                <strong>Site improvement:</strong> to analyse anonymised usage
                patterns and improve the Site, products, and user experience.
              </li>
              <li>
                <strong>Legal compliance:</strong> to comply with applicable laws,
                regulations, and legal processes, and to protect our rights and
                the rights of others.
              </li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              4. Legal Basis for Processing (GDPR)
            </h2>
            <p>
              If you are located in the EEA or UK, we process your personal data
              on the following legal bases:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Performance of a contract:</strong> processing necessary
                to deliver the products and services you have purchased.
              </li>
              <li>
                <strong>Legitimate interests:</strong> processing necessary for
                our legitimate business interests, such as improving our services,
                preventing fraud, and administering the mentorship program,
                provided these interests do not override your fundamental rights.
              </li>
              <li>
                <strong>Consent:</strong> where you have given explicit consent,
                such as subscribing to marketing communications. You may withdraw
                consent at any time.
              </li>
              <li>
                <strong>Legal obligation:</strong> processing necessary to comply
                with a legal obligation to which we are subject.
              </li>
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              5. How We Share Your Information
            </h2>
            <p>
              We do not sell, rent, or trade your personal information. We share
              your information only with the following categories of third-party
              service providers, strictly for the purposes described in this
              policy:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Stripe, Inc.</strong> (payment processing): receives your
                name, email, and payment details to process transactions.
                Stripe&apos;s privacy policy:{" "}
                <a href="https://stripe.com/privacy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                  stripe.com/privacy
                </a>
              </li>
              <li>
                <strong>Supabase, Inc.</strong> (authentication, database, and
                file storage): stores your account data, entitlements, mentorship
                content, and submitted files.
                Supabase&apos;s privacy policy:{" "}
                <a href="https://supabase.com/privacy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                  supabase.com/privacy
                </a>
              </li>
              <li>
                <strong>Vercel, Inc.</strong> (website hosting and analytics):
                hosts the Site and collects anonymised analytics data.
                Vercel&apos;s privacy policy:{" "}
                <a href="https://vercel.com/legal/privacy-policy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                  vercel.com/legal/privacy-policy
                </a>
              </li>
              <li>
                <strong>Resend, Inc.</strong> (email delivery): processes and
                delivers transactional and marketing emails on our behalf.
              </li>
              <li>
                <strong>Anthropic, PBC</strong> (AI assistant): messages you send
                to the AI chat assistant on the Site are processed by
                Anthropic&apos;s API to generate responses. We do not send your
                account data or personal information to Anthropic beyond the
                content of your chat messages.
              </li>
              <li>
                <strong>Formspree, Inc.</strong> (form processing): processes
                contact form and intake form submissions.
              </li>
            </ul>
            <p>
              We may also disclose your information where required by law, court
              order, or governmental authority, or where necessary to protect our
              legal rights or the safety of others.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              6. International Data Transfers
            </h2>
            <p>
              Our service providers are primarily located in the United States.
              By using the Site or purchasing our products, you acknowledge that
              your personal information may be transferred to and processed in
              the United States and other jurisdictions outside Australia, the
              EEA, and the UK.
            </p>
            <p>
              Where personal data is transferred outside the EEA or UK, we
              ensure appropriate safeguards are in place, including reliance on
              the service provider&apos;s Standard Contractual Clauses or other
              approved transfer mechanisms under the GDPR.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as necessary to
              fulfil the purposes for which it was collected, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Account data:</strong> for the duration of your account
                and for a reasonable period thereafter to allow for reactivation
                or to comply with legal obligations.
              </li>
              <li>
                <strong>Purchase and transaction records:</strong> for a minimum
                of seven (7) years to comply with Australian tax and accounting
                obligations.
              </li>
              <li>
                <strong>Mentorship submissions and session logs:</strong> for the
                duration of the mentorship program and for twelve (12) months
                after its conclusion, unless you request earlier deletion.
              </li>
              <li>
                <strong>Contact form and intake form submissions:</strong> for
                twelve (12) months after the enquiry is resolved.
              </li>
              <li>
                <strong>Chat assistant messages:</strong> not stored by us
                beyond the duration of your browser session. Anthropic may retain
                data in accordance with their own data retention policy.
              </li>
            </ul>
            <p>
              When personal information is no longer required, we will securely
              delete or anonymise it.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              8. Cookies and Tracking Technologies
            </h2>
            <p>
              The Site uses the following cookies and tracking technologies:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Strictly necessary cookies:</strong> Supabase
                authentication session cookies, required for the member portal to
                function. These cannot be disabled without breaking login
                functionality.
              </li>
              <li>
                <strong>Analytics:</strong> Vercel Analytics, which operates
                without cookies and collects only anonymised, aggregated data.
              </li>
            </ul>
            <p>
              We do not use advertising cookies, retargeting pixels, or any
              third-party tracking cookies. We do not participate in cross-site
              tracking or behavioural advertising.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              9. Data Security
            </h2>
            <p>
              We implement appropriate technical and organisational measures to
              protect your personal information against unauthorised access,
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                All data transmitted between your browser and the Site is
                encrypted using TLS (HTTPS).
              </li>
              <li>
                Authentication is managed through Supabase Auth with bcrypt
                password hashing. We do not have access to your plaintext
                password.
              </li>
              <li>
                Payment data is processed exclusively by Stripe, which is PCI
                DSS Level 1 certified. We never receive or store your full card
                number.
              </li>
              <li>
                Member portal content is protected by row-level security
                policies that restrict access to authorised users only.
              </li>
              <li>
                File downloads are served via short-lived signed URLs (60
                seconds) to prevent unauthorised access.
              </li>
            </ul>
            <p>
              No method of electronic transmission or storage is completely
              secure. While we strive to protect your personal information, we
              cannot guarantee absolute security.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              10. Your Rights
            </h2>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              10.1 Rights Under Australian Privacy Law
            </h3>
            <p>
              Under the Privacy Act 1988 (Cth), you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>
                Complain to the Office of the Australian Information Commissioner
                (OAIC) if you believe your privacy has been breached.
              </li>
            </ul>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              10.2 Rights Under GDPR (EEA and UK Residents)
            </h3>
            <p>
              If you are located in the EEA or UK, you have the following
              additional rights:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Right of access:</strong> to obtain confirmation of
                whether we process your personal data and to receive a copy.
              </li>
              <li>
                <strong>Right to rectification:</strong> to correct inaccurate or
                incomplete personal data.
              </li>
              <li>
                <strong>Right to erasure:</strong> to request deletion of your
                personal data where it is no longer necessary for the purposes
                for which it was collected, subject to legal retention
                requirements.
              </li>
              <li>
                <strong>Right to restriction:</strong> to request restriction of
                processing in certain circumstances.
              </li>
              <li>
                <strong>Right to data portability:</strong> to receive your
                personal data in a structured, commonly used, machine-readable
                format.
              </li>
              <li>
                <strong>Right to object:</strong> to object to processing based
                on legitimate interests or for direct marketing purposes.
              </li>
              <li>
                <strong>Right to withdraw consent:</strong> where processing is
                based on consent, to withdraw that consent at any time.
              </li>
            </ul>
            <p>
              You may exercise these rights by contacting us at the details
              provided in Section 13. We will respond within 30 days. You also
              have the right to lodge a complaint with your local data protection
              authority.
            </p>

            <h3 className="font-heading text-base font-semibold text-navy mt-4 mb-2">
              10.3 Rights Under CCPA (California Residents)
            </h3>
            <p>
              If you are a California resident, you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Know what personal information we collect, use, and disclose.
              </li>
              <li>Request deletion of your personal information.</li>
              <li>Opt out of the sale of personal information (we do not sell personal information).</li>
              <li>
                Not be discriminated against for exercising your privacy rights.
              </li>
            </ul>
          </div>

          {/* 11 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              11. Children&apos;s Privacy
            </h2>
            <p>
              The Site and our products are not directed at individuals under the
              age of 18. We do not knowingly collect personal information from
              children. If we become aware that we have collected personal
              information from a child under 18, we will take steps to delete
              that information promptly. If you believe we have collected
              information from a child, please contact us immediately.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              12. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technologies, legal requirements, or
              other factors. When we make material changes, we will update the
              &quot;Last updated&quot; date at the top of this page. We encourage
              you to review this policy periodically. Your continued use of the
              Site after any changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* 13 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              13. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, wish to
              exercise your privacy rights, or wish to make a complaint, please
              contact us:
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
            <p className="mt-4">
              If you are not satisfied with our response, you may lodge a
              complaint with the Office of the Australian Information
              Commissioner (OAIC) at{" "}
              <a href="https://www.oaic.gov.au" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                oaic.gov.au
              </a>
              , or with the relevant supervisory authority in your jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
