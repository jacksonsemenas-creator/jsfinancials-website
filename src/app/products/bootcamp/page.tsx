import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "6-Month Quantitative Trading Bootcamp",
  description:
    "The most intensive offering from JS Financials. 6 months of 3x weekly calls, video series, daily macro reports, model walkthroughs, and a fully built trading model by the end.",
};

const included = [
  {
    title: "3x Calls Per Week",
    description:
      "Three structured Google Meet sessions every week for the full 6 months. Consistent, hands-on progress.",
  },
  {
    title: "Full Video Series",
    description:
      "A complete video series breaking down every core quantitative trading concept from the ground up.",
  },
  {
    title: "Daily Macro Reports",
    description:
      "Full subscription to the JSF Daily Macroeconomic Reports included for the duration of the bootcamp.",
  },
  {
    title: "Model Walkthroughs",
    description:
      "Detailed walkthroughs of Jackson's live trading models — how they were built, why they work, and how they evolved.",
  },
  {
    title: "Personalised Weekly Content",
    description:
      "Custom content tailored to your progress and goals, delivered every week to keep you on track.",
  },
  {
    title: "Build Your Own Model",
    description:
      "By the end of 6 months, you'll have a fully developed, backtested, and validated trading model that meets institutional-grade standards.",
  },
  {
    title: "Discord Access",
    description:
      "Full access to the JSF Quantitative Trading Discord community for the duration of the bootcamp and beyond.",
  },
  {
    title: "300+ Learning Documents",
    description:
      "Complete access to the proprietary learning library spanning macro, quant methods, and market analysis.",
  },
];

const timeline = [
  {
    period: "Months 1-2",
    title: "Foundations",
    description:
      "Macroeconomic frameworks, quantitative methods, statistical foundations, and market structure. Build the knowledge base everything else rests on.",
  },
  {
    period: "Months 3-4",
    title: "Model Development",
    description:
      "Python coding, backtesting frameworks, signal construction, feature engineering, and strategy specification. Start building your model.",
  },
  {
    period: "Months 5-6",
    title: "Validation & Deployment",
    description:
      "Statistical validation, regime testing, portfolio construction, risk management, and live deployment. Finish with a validated, production-ready model.",
  },
];

export default function BootcampPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
              Most Intensive
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              6-Month Quantitative Trading Bootcamp
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              The most comprehensive, hands-on program from JS Financials. Six
              months of structured mentorship, video content, daily macro
              research, live model walkthroughs, and personalised weekly
              deliverables — all building toward a fully developed trading model
              that has checked every box.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div>
                <span className="text-4xl font-bold text-white">$6,000</span>
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
                6 months &middot; 3x calls/week
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://buy.stripe.com/14A3cxcqLeIP59m2Jm6J203"
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

      {/* What's Included */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            What&apos;s Included
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            6-Month Roadmap
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((phase) => (
              <div
                key={phase.period}
                className="bg-white border border-gray-200 rounded-2xl p-8"
              >
                <span className="text-gold font-mono text-sm font-medium">
                  {phase.period}
                </span>
                <h3 className="font-heading text-xl font-semibold text-navy mt-2 mb-3">
                  {phase.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Go All In?
          </h2>
          <p className="text-gray-300 mb-4">
            The bootcamp is the most intensive path to building a real,
            quantitative trading operation. Six months from now, you&apos;ll
            have a validated model, a structured process, and the skills to
            keep improving independently.
          </p>
          <p className="text-gray-500 text-sm italic mb-10">
            Not financial advice. Past performance is not indicative of future
            results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://buy.stripe.com/14A3cxcqLeIP59m2Jm6J203"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Enrol Now — $6,000 USD
            </a>
            <a
              href="https://calendly.com/jsfinancialsaustralia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border border-white/20 text-white hover:border-gold hover:text-gold rounded-lg transition-colors"
            >
              Book a 30-Min Call
            </a>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 border border-white/20 text-white hover:border-gold hover:text-gold rounded-lg transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
