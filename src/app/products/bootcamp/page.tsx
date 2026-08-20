import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "1-on-1 Mentorship Program",
  description:
    "The most intensive offering from JS Financials. 6 months of 1-on-1 mentorship with Jackson Semenas. 89 curriculum documents across three tiers: 12 period documents, 55 topic documents, and 20 applicability modules.",
};

const included = [
  {
    title: "3x Calls Per Week",
    description:
      "Three structured Google Meet sessions every week for the full 6 months. Consistent, hands-on progress with direct feedback.",
  },
  {
    title: "12 Period Documents",
    description:
      "The spine of the curriculum. A structured 12-period sequence from foundations through to the capstone. Each period includes companion datasets for hands-on exercises.",
  },
  {
    title: "55 Topic Documents",
    description:
      "The shelf. A comprehensive reference library across eight clusters: statistics, data, econometrics, economics, markets, risk, coding, and mathematics.",
  },
  {
    title: "20 Applicability Modules",
    description:
      "The workflows. Step-by-step modules in four arcs that bridge theory and practice, from filing your first hypothesis through to the capstone assembly.",
  },
  {
    title: "Video Walkthroughs",
    description:
      "A supporting video for every period, topic document, and module. Visual breakdowns of key concepts, worked examples, and live demonstrations.",
  },
  {
    title: "Daily Macro Reports",
    description:
      "Full subscription to the JSF Daily Macroeconomic Reports for the duration of the program. Institutional-grade macro analysis, every day.",
  },
  {
    title: "Prediction Markets Course",
    description:
      "Full access to the JSF Prediction Markets Trading Course. 23 modules covering fair value pricing, model development, and deployment.",
  },
  {
    title: "Macroeconomics Course",
    description:
      "Full access to the JSF Macroeconomics for Financial Markets and Trading Course. 25,000+ words on how macro drives asset prices.",
  },
  {
    title: "Discord Community",
    description:
      "Full access to the JSF Quantitative Trading Discord. Live signals, macro discussion, strategy development, and direct access to Jackson.",
  },
  {
    title: "Build Your Own Model",
    description:
      "By the end of 6 months, you will have a fully developed, backtested, and validated trading model that meets institutional-grade standards.",
  },
  {
    title: "Model Development Tracker",
    description:
      "A 5-stage visual tracker following your model from idea through design, validation, backtest, and live plan. Jackson controls the stage progression.",
  },
  {
    title: "Submission and Review System",
    description:
      "Submit your code, notebooks, and strategy write-ups directly through the portal. Jackson reviews your work with threaded feedback.",
  },
];

const topicClusters = [
  { label: "Statistics", count: 9, examples: "Distributions, stationarity, autocorrelation, hypothesis testing, bootstrap, Bayesian inference, regression, robust statistics" },
  { label: "Data", count: 5, examples: "Data sources, cleaning protocols, bias catalog, feature engineering, alternative data evaluation" },
  { label: "Econometrics", count: 8, examples: "ARMA/ARIMA, GARCH, cointegration, VAR, regime switching, structural breaks, Kalman filters, panel data" },
  { label: "Economics and Macro", count: 7, examples: "Growth cycles, inflation, monetary policy, fiscal policy, FX, labour markets, commodities" },
  { label: "Markets and Microstructure", count: 7, examples: "Yield curves, equity structure, credit, options, futures, crypto venues, participant flows" },
  { label: "Risk and Portfolio", count: 4, examples: "Risk measurement, position sizing, hedging, operational and counterparty risk" },
  { label: "Coding", count: 8, examples: "Python, Pandas, backtesting engines, data infrastructure, APIs, execution, deployment, monitoring" },
  { label: "Mathematics", count: 7, examples: "Linear algebra, probability, calculus, stochastic processes, information theory, numerical methods, algorithms" },
];

const moduleArcs = [
  {
    arc: "Arc 1: Idea to Evidence",
    modules: [
      "Filing a Strategy Hypothesis",
      "Data Acquisition and Validation",
      "The First Honest Backtest",
      "Statistical Validation",
      "The Kill-or-Continue Decision",
    ],
  },
  {
    arc: "Arc 2: Evidence to Production",
    modules: [
      "Constructing the Sizing Policy",
      "Designing the Execution Policy",
      "Building the Live System",
      "Paper Trading and the Graduation Ladder",
      "Day One to Day Ninety",
    ],
  },
  {
    arc: "Arc 3: Running the Book",
    modules: [
      "The Daily Process",
      "The Drawdown Response Protocol",
      "Decay Detection and Retirement",
      "Adding a Second Strategy",
      "Incident Response and Post-Mortems",
    ],
  },
  {
    arc: "Arc 4: Domain Applications",
    modules: [
      "Expressing a Macro View",
      "Prediction Markets End to End",
      "Operating on Crypto Venues",
      "A Pairs Trade End to End",
      "The Capstone Assembly",
    ],
  },
];

const periods = [
  "Foundations of Systematic Trading",
  "Data",
  "Statistical Foundations",
  "Time Series and Econometrics",
  "Economics as an Alpha Source",
  "Strategy Design",
  "Backtesting",
  "Validation and Edge Decay",
  "Portfolio Construction and Risk",
  "Execution and Microstructure",
  "Live Deployment",
  "The Capstone",
];

export default function MentorshipPage() {
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
              1-on-1 Mentorship Program
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Six months of structured, 1-on-1 mentorship with Jackson Semenas.
              89 curriculum documents across three tiers: twelve period documents
              (the spine), fifty-five topic documents (the shelf), and twenty
              applicability modules (the workflows). Plus video walkthroughs,
              daily macro reports, and every JS Financials product included.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-gold text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                6 months
              </div>
              <div className="flex items-center gap-2 text-gold text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                3x calls/week
              </div>
              <div className="flex items-center gap-2 text-gold text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                89 documents
              </div>
            </div>
            <a
              href="https://calendly.com/jsfinancialsaustralia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Numbers bar */}
      <section className="bg-navy-dark border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { stat: "12", label: "Period Documents" },
              { stat: "55", label: "Topic Documents" },
              { stat: "20", label: "Applicability Modules" },
              { stat: "40+", label: "Companion Datasets" },
              { stat: "72+", label: "Weekly Calls" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-gold font-heading text-2xl font-bold">
                  {item.stat}
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">
            Everything That&apos;s Included
          </h2>
          <p className="text-gray-600 max-w-2xl mb-10">
            The mentorship is not a course. It is a structured, personalised
            program with 89 curriculum documents across three tiers, plus every
            resource you need to go from where you are now to running a validated
            quantitative trading model.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* The Spine: 12 Periods */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">
            The Spine: 12 Period Documents
          </h2>
          <p className="text-gray-600 max-w-2xl mb-10">
            The structured sequence that drives the mentorship forward. Each
            period builds on the last and includes companion datasets for
            hands-on work.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {periods.map((title, i) => (
              <div
                key={title}
                className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold text-sm font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-navy text-sm font-medium">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Shelf: 55 Topic Documents */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">
            The Shelf: 55 Topic Documents Across 8 Clusters
          </h2>
          <p className="text-gray-600 max-w-2xl mb-10">
            A standalone reference library covering every quantitative,
            macroeconomic, and infrastructure topic you will encounter. Each
            document is designed to be read independently and revisited as
            needed.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topicClusters.map((cat) => (
              <div
                key={cat.label}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-semibold text-navy text-sm">
                    {cat.label}
                  </h3>
                  <span className="text-gold text-xs font-bold">
                    {cat.count}
                  </span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {cat.examples}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Workflows: 20 Applicability Modules */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">
            The Workflows: 20 Applicability Modules
          </h2>
          <p className="text-gray-600 max-w-2xl mb-10">
            Theory means nothing without application. Four arcs walk you through
            every step of building, validating, deploying, and operating a real
            trading strategy.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            {moduleArcs.map((arc) => (
              <div key={arc.arc}>
                <h3 className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">
                  {arc.arc}
                </h3>
                <div className="space-y-2">
                  {arc.modules.map((title, i) => {
                    const globalIndex =
                      moduleArcs
                        .slice(0, moduleArcs.indexOf(arc))
                        .reduce((sum, a) => sum + a.modules.length, 0) +
                      i +
                      1;
                    return (
                      <div
                        key={title}
                        className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3"
                      >
                        <span className="shrink-0 w-7 h-7 rounded-full bg-gold/10 text-gold text-xs font-bold flex items-center justify-center mt-0.5">
                          {String(globalIndex).padStart(2, "0")}
                        </span>
                        <p className="text-navy text-sm font-medium">{title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Also Included */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            Also Included With Your Enrolment
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Daily Macro Reports",
                description: "Institutional-grade daily briefings covering 40+ FX pairs, 9 commodities, 9 equity indices, and 8 cryptocurrencies. Delivered to your inbox every day.",
                href: "/products/daily-reports",
              },
              {
                title: "Prediction Markets Course",
                description: "23 modules on systematic prediction market trading. Fair value pricing, model development, backtesting, validation, and deployment.",
                href: "/products/prediction-markets",
              },
              {
                title: "Macroeconomics Course",
                description: "25,000+ word course covering how macroeconomic forces drive asset prices across FX, equities, commodities, fixed income, and crypto.",
                href: "/products/macro-course",
              },
              {
                title: "Discord Community",
                description: "Private quantitative trading community. Live signals, macro discussion, strategy development, code sharing, and direct access to Jackson.",
                href: null,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {item.description}
                </p>
                {item.href && (
                  <Link
                    href={item.href}
                    className="text-gold text-sm font-medium hover:text-gold-light transition-colors"
                  >
                    Learn more
                  </Link>
                )}
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
            The mentorship is the most intensive path to building a real,
            quantitative trading operation. Six months from now, you will have a
            validated model, a structured process, and the skills to keep
            improving independently.
          </p>
          <p className="text-gray-300 mb-4">
            Book a free 30-minute call to discuss your background, goals, and
            whether this program is the right fit.
          </p>
          <p className="text-gray-500 text-sm italic mb-10">
            Not financial advice. Past performance is not indicative of future
            results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/jsfinancialsaustralia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Apply Now
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
