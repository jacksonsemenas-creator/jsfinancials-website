import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "1-on-1 Mentorship: 12-Week Trading Curriculum",
  description:
    "Personalised 12-week mentorship with Jackson Semenas. Unlimited sessions, direct phone access, and a fully coded trading model by the end.",
};

const weeks = [
  {
    period: "Weeks 1-2",
    title: "Macro Foundations",
    description:
      "Build a comprehensive understanding of how macroeconomic forces drive markets across asset classes.",
  },
  {
    period: "Weeks 3-4",
    title: "Quantitative Methods",
    description:
      "Learn the statistical and mathematical frameworks behind systematic trading strategies.",
  },
  {
    period: "Weeks 5-6",
    title: "Python & Backtesting",
    description:
      "Hands-on coding in Python. Build and backtest your first trading model with real market data.",
  },
  {
    period: "Weeks 7-8",
    title: "Model Validation",
    description:
      "Statistical validation, out-of-sample testing, and ensuring your model is robust and not overfitted.",
  },
  {
    period: "Weeks 9-10",
    title: "Portfolio Construction",
    description:
      "Risk management frameworks, position sizing, correlation analysis, and portfolio-level thinking.",
  },
  {
    period: "Weeks 11-12",
    title: "Live Deployment",
    description:
      "Take your model live. Covers execution, monitoring, tax considerations, and a 12-month trading plan.",
  },
];

const included = [
  {
    title: "3x Calls Per Week",
    description:
      "Three Google Meet sessions per week throughout the 12 weeks. Consistent, structured progress.",
  },
  {
    title: "Direct Phone Access",
    description:
      "Permanent direct phone access to Jackson, even after the program ends.",
  },
  {
    title: "Private Discord Channel",
    description:
      "Your own private Discord channel with direct mentor access for async communication.",
  },
  {
    title: "300+ Learning Documents",
    description:
      "Full access to the proprietary learning library spanning macro, quant methods, and market analysis.",
  },
  {
    title: "Course Materials & Templates",
    description:
      "Exclusive course materials, strategy templates, risk management guides, and model frameworks.",
  },
  {
    title: "Model Validation & Approval",
    description:
      "Personal validation and approval of your trading model before you deploy it live.",
  },
];

export default function MentorshipPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
              Most Comprehensive
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              1-on-1 Mentorship: 12-Week Trading Curriculum
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              A fully personalised 12-week mentorship program with direct
              access to Jackson. Every program is individually designed around
              your goals, experience, and the markets you want to trade. No
              generic curriculum. You&apos;ll finish with a fully coded,
              backtested, and validated trading model ready for live deployment.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div>
                <span className="text-4xl font-bold text-white">$3,000</span>
                <span className="text-gray-400 ml-2">AUD one-time</span>
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                3x calls / week
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://buy.stripe.com/8x29AVaiDasz59mdo06J202"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
              >
                Join Now
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

      {/* 12-Week Curriculum */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            12-Week Curriculum
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeks.map((week) => (
              <div
                key={week.period}
                className="border border-gray-200 rounded-2xl p-6 hover:border-gold/40 transition-colors"
              >
                <span className="text-gold font-mono text-sm font-medium">
                  {week.period}
                </span>
                <h3 className="font-heading text-xl font-semibold text-navy mt-2 mb-3">
                  {week.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {week.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            What&apos;s Included
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-2xl p-6"
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

      {/* Who It's For */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            Who Is This For?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Complete Beginners",
                description:
                  "No prior experience needed. The curriculum is built from the ground up around your starting point.",
              },
              {
                title: "Self-Taught Traders",
                description:
                  "If you've been learning on your own and want structured, systematic guidance to take the next step.",
              },
              {
                title: "Experienced Traders",
                description:
                  "Preparing models for live deployment, adding quantitative methods, or refining your existing edge.",
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

      {/* Post-Program */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">
            It Doesn&apos;t End at Week 12
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            You&apos;ll receive a personalised 12-month trading plan at the end
            of the program, plus permanent access to Jackson&apos;s direct
            contact for ongoing support and consultation.
          </p>
          <p className="text-gray-500 text-sm italic mb-10">
            Not financial advice. Past performance is not indicative of future
            results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://buy.stripe.com/8x29AVaiDasz59mdo06J202"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Join Now — $3,000 AUD
            </a>
            <a
              href="https://calendly.com/jsfinancialsaustralia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-navy hover:border-gold hover:text-gold rounded-lg transition-colors"
            >
              Book a 30-Min Call
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
