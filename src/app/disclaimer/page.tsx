import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Disclaimer",
  description:
    "JS Financials Financial Disclaimer. Important information about the nature of our educational content and your responsibilities.",
};

export default function DisclaimerPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold text-navy mb-2">
          Financial Disclaimer
        </h1>
        <p className="text-gray-500 text-sm mb-12">
          Last updated: 1 September 2026
        </p>

        <div className="prose prose-navy max-w-none text-gray-700 text-sm leading-relaxed space-y-8">
          {/* 1 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              1. General
            </h2>
            <p>
              JS Financials is operated by Jackson Semenas (ABN 57 226 575 365),
              based in Australia. JS Financials provides financial education
              only. All content on jsfinancials.com.au (the &quot;Site&quot;),
              within our products, courses, reports, mentorship program, Discord
              community, and any other communication channel is provided for
              general educational and informational purposes only.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              2. Not Financial Advice
            </h2>
            <p>
              <strong>
                Nothing on this Site or in any JS Financials product constitutes
                personal financial advice, investment advice, tax advice, legal
                advice, or a recommendation to buy, sell, hold, or otherwise
                transact in any financial instrument, security, cryptocurrency,
                derivative, or prediction market contract.
              </strong>
            </p>
            <p>
              JS Financials is not a licensed financial adviser, stockbroker,
              dealer, investment manager, or credit provider under Australian
              law. We do not hold an Australian Financial Services Licence
              (AFSL) and are not authorised to provide personal financial
              product advice under the Corporations Act 2001 (Cth).
            </p>
            <p>
              We do not take into account your personal financial situation,
              objectives, or needs. Any information, analysis, strategy,
              model, or framework discussed is general in nature and should
              not be relied upon as the basis for any financial decision.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              3. Risk of Loss
            </h2>
            <p>
              Trading and investing in financial markets, including but not
              limited to equities, foreign exchange, commodities, fixed income,
              cryptocurrencies, derivatives, and prediction markets, involves
              substantial risk of loss. You can lose some or all of your
              invested capital.
            </p>
            <p>
              Leveraged products and derivatives carry additional risk. The use
              of leverage can amplify both gains and losses. You should not trade
              or invest with money you cannot afford to lose.
            </p>
            <p>
              The risk of loss in trading can be substantial. You should
              carefully consider whether trading or investing is appropriate for
              you in light of your financial condition, experience, and risk
              tolerance.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              4. No Guarantees
            </h2>
            <p>
              <strong>
                We do not guarantee any specific outcome, return, profit, or
                performance from the use of our products, services, strategies,
                models, or educational materials.
              </strong>
            </p>
            <p>
              Any examples, case studies, backtests, model results, or
              performance figures presented in our content are hypothetical or
              historical in nature and are provided for educational illustration
              only. They do not represent actual trading results and are not
              indicative of future performance.
            </p>
            <p>
              Hypothetical performance results have many inherent limitations.
              No representation is made that any account will or is likely to
              achieve profits or losses similar to those shown. There are
              frequently sharp differences between hypothetical performance
              results and the actual results subsequently achieved by any
              particular trading program.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              5. Past Performance
            </h2>
            <p>
              <strong>
                Past performance is not indicative of future results.
              </strong>{" "}
              The fact that a strategy, model, or approach has performed well
              historically does not mean it will perform well in the future.
              Market conditions change. Strategies decay. Edges erode.
            </p>
            <p>
              Any reference to historical performance, backtested results, or
              live trading results in our content is for educational context
              only and should not be interpreted as a prediction or promise of
              future performance.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              6. Your Responsibility
            </h2>
            <p>
              You are solely responsible for your own trading and investment
              decisions. Before making any financial decision, you should:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Seek independent professional financial advice from a qualified
                and licensed financial adviser who is authorised to provide
                personal advice.
              </li>
              <li>
                Conduct your own research and due diligence on any financial
                instrument, strategy, or market you intend to trade.
              </li>
              <li>
                Consider your personal financial situation, objectives, risk
                tolerance, and experience level.
              </li>
              <li>
                Read and understand the product disclosure statement (PDS) or
                equivalent documentation for any financial product before
                transacting.
              </li>
              <li>
                Understand the specific risks associated with the markets and
                instruments you trade, including leverage, liquidity, and
                counterparty risk.
              </li>
            </ul>
            <p>
              JS Financials accepts no responsibility or liability for any loss
              or damage arising from your reliance on any content, product, or
              service we provide.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              7. Daily Macroeconomic Reports
            </h2>
            <p>
              The JSF Daily Macroeconomic Reports contain analysis, commentary,
              directional bias assessments, risk scores, and tradability
              rankings across multiple asset classes. These are provided as
              educational research summaries reflecting a general macro view at
              the time of publication.
            </p>
            <p>
              They are not trade signals, recommendations, or instructions to
              enter or exit any position. A directional bias or risk score does
              not constitute advice to buy or sell. You should not use the
              reports as the sole basis for any trading decision.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              8. Trading Models and Strategies
            </h2>
            <p>
              References to active trading models, quantitative strategies, or
              systematic approaches on the Site are provided for educational
              context and to demonstrate the type of research conducted by JS
              Financials. They are not offers to manage money, invitations to
              invest, or solicitations to copy or replicate any strategy.
            </p>
            <p>
              Any strategy, model, or code discussed or provided in our courses,
              mentorship program, or educational materials is presented as a
              learning exercise. It is your responsibility to independently
              validate, test, and assess any approach before committing real
              capital.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              9. Mentorship Program
            </h2>
            <p>
              The 1-on-1 Mentorship Program is an educational engagement. The
              mentorship involves structured learning, curriculum delivery,
              feedback on student work, and guidance on quantitative methods
              and trading system development.
            </p>
            <p>
              The mentorship does not constitute a managed account service,
              portfolio management, or personal financial advisory relationship.
              Jackson Semenas is your educator, not your financial adviser. Any
              model you build during the program is your own work and your own
              responsibility. We do not approve, endorse, or take responsibility
              for any trading decisions you make using strategies developed
              during the mentorship.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              10. Discord Community
            </h2>
            <p>
              The JSF Quantitative Trading Discord is a community discussion
              platform. Messages, signals, analysis, and opinions shared in the
              Discord (by Jackson or by other members) are not financial advice
              and should not be treated as such. Community members are not
              qualified financial advisers. You should not rely on any statement
              made in the Discord as the basis for a financial decision.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              11. AI Chat Assistant
            </h2>
            <p>
              The AI chat assistant embedded on the Site is provided for
              informational and navigational purposes. It uses a large language
              model and may produce responses that are inaccurate, incomplete,
              or out of date. Responses from the AI assistant do not constitute
              financial advice, personal advice, or any form of professional
              recommendation.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              12. Affiliate Links
            </h2>
            <p>
              The Site contains affiliate links to third-party products and
              platforms. Where an affiliate link is used, we may earn a
              commission if you make a purchase or open an account through that
              link. This does not affect the price you pay. The presence of an
              affiliate link does not constitute a recommendation or endorsement
              of the third-party product. You should conduct your own due
              diligence before using any third-party platform.
            </p>
          </div>

          {/* 13 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              13. Accuracy of Information
            </h2>
            <p>
              While we make reasonable efforts to ensure the accuracy and
              currency of the information presented on the Site and in our
              products, we do not warrant that any content is complete, accurate,
              reliable, or free from error. Financial markets are dynamic and
              information can become outdated rapidly. We are not obligated to
              update any content after publication.
            </p>
          </div>

          {/* 14 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              14. Regulatory Notice
            </h2>
            <p>
              JS Financials is not regulated by the Australian Securities and
              Investments Commission (ASIC) as a financial services provider. We
              do not hold an Australian Financial Services Licence (AFSL). Our
              products are classified as general educational content, not
              financial products or financial services within the meaning of the
              Corporations Act 2001 (Cth).
            </p>
            <p>
              If you are located outside Australia, you are responsible for
              ensuring that your use of our products complies with the laws and
              regulations of your jurisdiction. Some financial products and
              markets referenced in our content may not be available or legal in
              your jurisdiction.
            </p>
          </div>

          {/* 15 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              15. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, JS Financials,
              its owner, employees, and contractors shall not be liable for any
              direct, indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits, revenue, data, or opportunities,
              arising from or in connection with your use of or reliance on any
              content, product, service, strategy, model, or information
              provided by JS Financials.
            </p>
            <p>
              This limitation applies regardless of whether the damages are
              based on contract, tort, negligence, strict liability, or any
              other legal theory, and regardless of whether we have been advised
              of the possibility of such damages.
            </p>
            <p>
              Nothing in this disclaimer excludes or limits liability that
              cannot be excluded or limited under applicable law, including
              under the Australian Consumer Law.
            </p>
          </div>

          {/* 16 */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy mb-3">
              16. Contact
            </h2>
            <p>
              If you have questions about this disclaimer, contact us:
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
              This disclaimer should be read together with our{" "}
              <Link href="/terms" className="text-gold hover:underline">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>
              , and{" "}
              <Link href="/refunds" className="text-gold hover:underline">
                Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
