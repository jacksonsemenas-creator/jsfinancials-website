import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prediction Markets Trading Course",
  description:
    "A 23-module program on systematic prediction market trading: fair value pricing for binary contracts, model development, validation, and deployment.",
};

const learningItems = [
  "Pricing binary contracts with a fair value model",
  "Volatility estimation and why it drives everything",
  "Signal design, entry rules, and expected value",
  "Realistic backtesting and out-of-sample validation",
  "Execution, monitoring, and risk management",
  "Scaling capital and multi-strategy portfolios",
];

const courseBlocks = [
  {
    kicker: "Modules 1-8",
    heading: "Core Curriculum",
    style: "bg-navy/5 text-navy",
    bullets: [
      "Prediction markets and binary contracts",
      "Derivatives pricing and volatility",
      "Fair value framework",
      "Signal design and entry rules",
      "Backtesting and out-of-sample validation",
      "Risk management and deployment",
    ],
  },
  {
    kicker: "Modules 9-13",
    heading: "Case Studies",
    style: "bg-gold/10 text-gold",
    bullets: [
      "Full fair value trade walkthrough",
      "Entry rules and expected value in practice",
      "Statistical validation of a real trade sample",
      "Pitfalls, confounds, and broken backtests",
      "Concentration and robustness testing",
    ],
  },
  {
    kicker: "Modules 14-23",
    heading: "Model Development",
    style: "bg-navy/5 text-navy",
    bullets: [
      "Building a backtest engine",
      "Data pipelines and infrastructure",
      "Signal patterns and parameter optimization",
      "Paper trading and monitoring dashboards",
      "Multi-strategy portfolios and regime detection",
      "Production execution, scaling, and incident response",
    ],
  },
];

export default function PredictionMarketsPage() {
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
              Prediction Markets Trading Course
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              A complete program on systematic prediction market trading: fair
              value pricing for short dated binary contracts, full model
              development, statistical validation, and live deployment. Built
              around the same research process used on live quantitative
              strategies, with honest backtests, out-of-sample testing, and risk
              discipline at the core.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div>
                <span className="text-4xl font-bold text-white">$500</span>
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
                href="https://buy.stripe.com/14AaEZ62n0RZ31e6ZC6J20c"
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
            {learningItems.map((item) => (
              <div
                key={item}
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
                  {item}
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
          <div className="grid md:grid-cols-3 gap-8">
            {courseBlocks.map((block) => (
              <div
                key={block.kicker}
                className="bg-white border border-gray-200 rounded-2xl p-8"
              >
                <div
                  className={`inline-flex items-center px-3 py-1 ${block.style} text-xs font-semibold uppercase tracking-wider rounded-full mb-4`}
                >
                  {block.kicker}
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-4">
                  {block.heading}
                </h3>
                <ul className="space-y-3">
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 text-gray-600 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
                title: "200+ Pages",
                description:
                  "Across 23 research grade modules with charts, worked examples, and Python code templates.",
              },
              {
                title: "Video Lecture Series",
                description:
                  "A full lecture for every module, released weekly to enrolled students.",
              },
              {
                title: "Lifetime Access",
                description:
                  "Access the course forever, including all future updates and expansions.",
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

      {/* Who Is This For */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">
            Who Is This For?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Algorithmic traders wanting a rigorous development process, quant
            and finance students bridging theory to live markets, and
            discretionary traders going systematic. No advanced background
            required; basic Python helps for the build modules and everything
            is taught from first principles.
          </p>
          <p className="text-gray-500 text-sm italic mb-10">
            This is an education-first program focused on process, validation,
            and discipline. Not a signal service. Not a trading strategy. Not
            financial advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://buy.stripe.com/14AaEZ62n0RZ31e6ZC6J20c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Enrol Now - $500 USD
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
