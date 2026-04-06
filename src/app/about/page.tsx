import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Jackson Semenas, quantitative trader, researcher, and founder of JS Financials.",
};

const timeline = [
  {
    year: "2021",
    title: "Started Trading at 14",
    description:
      "Began developing basic algorithmic trading models, driven by an interest in economics and how it applies to financial markets.",
  },
  {
    year: "2022",
    title: "Fundamental Economic Research",
    description:
      "Continued to research economics at a fundamental level and how it correlated to financial markets.",
  },
  {
    year: "2023",
    title: "AUDUSD Yield Differential Mean Reversion Model",
    description:
      "Developed the AUDUSD Yield Differential Mean Reversion model, a forex strategy still in use to this day.",
  },
  {
    year: "2024",
    title: "Expanded into HFT & Quant Research",
    description:
      "Expanded research into HFT, market microstructure, applied statistical modelling, and data structuring.",
  },
  {
    year: "2025",
    title: "Published Policy Proposal",
    description:
      "Published an economic policy proposal for balancing immigration and inflation in the Australian economy, put forward to the Australian Treasury for review and implementation.",
  },
  {
    year: "2025",
    title: "Gold Cross-Asset Analysis Model",
    description:
      "Developed the Gold Cross-Asset Analysis LFT model, historically the best performing model in the portfolio.",
  },
  {
    year: "2025",
    title: "99.95 University Selection Rank",
    description:
      "Achieved a 99.95 University Selection Rank. Accepted into Honours in Finance, Economics, and Statistics at the Australian National University (ANU).",
  },
  {
    year: "2025",
    title: "Launched JS Financials",
    description:
      "Launched JS Financials to provide institutional-grade quantitative trading education and macroeconomic research to retail traders.",
  },
  {
    year: "2026",
    title: "Polymarket HFT Latency Arbitrage",
    description:
      "Began developing a high-frequency latency arbitrage model on Polymarket prediction markets.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
                Jackson Semenas
              </h1>
              <p className="text-gold text-lg font-medium mb-6">
                Quantitative Trader & Researcher
              </p>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I got into trading through my interest in economics and how
                  it applies to financial markets. At 14, I started developing
                  basic algorithms, and I haven&apos;t stopped building models
                  since.
                </p>
                <p>
                  Today I run both high-frequency and low-frequency trading
                  models across commodities, forex, and prediction markets. My
                  research spans quantitative methods, economics, market
                  microstructure, latency arbitrage, and applied statistical
                  modelling.
                </p>
                <p>
                  I founded JS Financials to bridge the gap between
                  institutional-grade analysis and retail traders, providing
                  real research, not hype.
                </p>
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/jackson-nyse-2.jpg"
                alt="Jackson Semenas at the NYSE"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-14">
            Journey
          </h2>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1/2 mt-1.5 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-10 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <span className="text-gold font-mono text-sm font-medium">
                      {item.year}
                    </span>
                    <h3 className="font-heading text-xl font-semibold text-navy mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-14">
            Research Interests
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Quantitative Methods",
                description:
                  "Statistical modelling, stochastic processes, and computational methods applied to financial markets.",
              },
              {
                title: "Macroeconomics",
                description:
                  "Central bank policy, yield curve dynamics, cross-asset flows, and how macro forces drive asset prices.",
              },
              {
                title: "Market Microstructure",
                description:
                  "Order flow analysis, price discovery mechanisms, and the structural dynamics of modern electronic markets.",
              },
              {
                title: "Latency Arbitrage",
                description:
                  "High-frequency exploitation of price dislocations across venues, including prediction markets and spot exchanges.",
              },
              {
                title: "Applied Statistical Modelling",
                description:
                  "Time-series analysis, regime detection, and mean-reversion models for systematic trading strategies.",
              },
              {
                title: "Economic Policy",
                description:
                  "Research into macroeconomic policy design, including published work on immigration and inflation dynamics in Australia.",
              },
            ].map((interest) => (
              <div
                key={interest.title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">
                  {interest.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
