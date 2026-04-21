import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Macroeconomics for Financial Markets & Trading",
  description:
    "A comprehensive 25,000+ word course on how macroeconomic forces drive asset prices across FX, equities, commodities, fixed income, and crypto.",
};

const foundations = [
  "Economic growth and business cycles",
  "Inflation dynamics",
  "Monetary and fiscal policy",
  "Interest rates and currencies",
  "Capital flows, commodities, and equities",
  "Liquidity and integrated macro regimes",
];

const application = [
  "Regime-to-bias translation",
  "Scenario construction",
  "Cross-market confirmation",
  "Strategy-regime alignment",
  "Risk management under regime uncertainty",
  "Psychological discipline",
];

const outcomes = [
  "Capital flow mechanics through global financial systems",
  "Interactions between growth, inflation, policy, and liquidity",
  "Why markets move ahead of economic data releases",
  "Macroeconomic regime formation, persistence, and transitions",
  "Asset class responses to changing macro conditions",
  "Translation of macro analysis into trading decisions",
];

export default function MacroCoursePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
              Course
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Macroeconomics for Financial Markets & Trading
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              A comprehensive 25,000+ word educational program examining how the
              global macroeconomic system functions and transmits across FX,
              equities, commodities, fixed income, credit, and crypto.
              Framework-driven education built around causality, regime
              dynamics, and probabilistic reasoning.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div>
                <span className="text-4xl font-bold text-white">$199</span>
                <span className="text-gray-400 ml-2">USD one-time</span>
              </div>
              <div className="flex items-center gap-2 text-gold text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Lifetime access
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://buy.stripe.com/8x2eVf0I3fMT31e6ZC6J204"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
              >
                Enrol Now
              </a>
              <a
                href="https://calendly.com/jsfinancialsaustralia/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 border border-white/20 text-white hover:border-gold hover:text-gold rounded-lg transition-colors"
              >
                Book a Call First
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            What You&apos;ll Learn
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 p-5 border border-gray-200 rounded-xl"
              >
                <svg
                  className="w-5 h-5 text-gold mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 text-sm leading-relaxed">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            Course Structure
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Foundations */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="inline-flex items-center px-3 py-1 bg-navy/5 text-navy text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Modules 1-12
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-4">
                Foundations
              </h3>
              <ul className="space-y-3">
                {foundations.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-gray-600 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Application */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="inline-flex items-center px-3 py-1 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Modules A-H + Capstone
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-4">
                Application
              </h3>
              <ul className="space-y-3">
                {application.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-gray-600 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            What&apos;s Included
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "25,000+ Words",
                description:
                  "Across 20 in-depth modules covering macro theory and practical application.",
              },
              {
                title: "Lifetime Access",
                description:
                  "Access the course forever, including all future updates and expansions.",
              },
              {
                title: "Direct Support",
                description:
                  "1-on-1 messaging support via Instagram (@js_financials) for any questions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-navy rounded-2xl p-6 text-center"
              >
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">
            Who Is This For?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Traders, investors seeking structural macro frameworks, and
            professionals wanting deeper market understanding. No advanced
            economics background required.
          </p>
          <p className="text-gray-500 text-sm italic mb-10">
            This is an education-first program focused on understanding,
            judgement, and discipline. Not a signal service. Not a trading
            strategy. Not financial advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://buy.stripe.com/8x2eVf0I3fMT31e6ZC6J204"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Enrol Now — $199 USD
            </a>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-navy hover:border-gold hover:text-gold rounded-lg transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
