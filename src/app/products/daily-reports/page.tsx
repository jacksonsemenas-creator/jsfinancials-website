import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily Macroeconomic Reports",
  description:
    "Institutional-grade daily macro briefings covering 40+ FX pairs, commodities, indices, and crypto. Delivered daily at 10:00 PM AEDT.",
};

const coverage = [
  {
    category: "Foreign Exchange",
    detail: "40+ major and minor FX pairs",
    count: "40+",
  },
  {
    category: "Commodities",
    detail: "Gold, silver, oil, copper, iron ore, and more",
    count: "9",
  },
  {
    category: "Equity Indices",
    detail: "S&P 500, ASX 200, DAX, Nikkei, FTSE, and more",
    count: "9",
  },
  {
    category: "Crypto",
    detail: "BTC, ETH, SOL, XRP, and more",
    count: "8",
  },
];

const components = [
  {
    title: "Global Macro Overview",
    description:
      "Sentiment shifts, bond market recaps, geopolitical events, cross-asset correlations, and tail risks.",
  },
  {
    title: "FX Fundamental Analysis",
    description:
      "Economic indicators, central bank positioning, and yield analysis for each pair.",
  },
  {
    title: "Commodity Analysis",
    description:
      "Supply/demand dynamics, production trends, and macro-driven price drivers.",
  },
  {
    title: "Index Macro Drivers",
    description:
      "Volatility metrics (VIX, MOVE), sector rotation, and equity flow analysis.",
  },
  {
    title: "Crypto Analysis",
    description:
      "On-chain metrics, liquidity analysis, and macro correlation mapping.",
  },
  {
    title: "All-Asset Dashboard",
    description:
      "Bias, risk scores, catalysts, and tradability rankings across every asset covered.",
  },
];

export default function DailyReportsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
              Subscription
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Daily Macroeconomic Reports
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Institutional-grade top-down clarity before each session opens.
              Covering major and minor FX pairs, global commodities, equity
              indices, and cryptocurrencies. Delivered daily at 10:00 PM AEDT,
              seven days a week.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div>
                <span className="text-4xl font-bold text-white">$39.99</span>
                <span className="text-gray-400 ml-2">AUD / month</span>
              </div>
              <div className="text-gray-500 text-sm">
                or $359.99 / year (save 25%)
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://shop.jsfinancials.com.au/products/jsf-weekly-macroeconomic-fx-reports"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
              >
                Subscribe Now
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

      {/* Coverage */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            Market Coverage
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverage.map((item) => (
              <div
                key={item.category}
                className="border border-gray-200 rounded-2xl p-6 text-center hover:border-gold/40 transition-colors"
              >
                <div className="text-gold font-heading text-3xl font-bold mb-2">
                  {item.count}
                </div>
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">
                  {item.category}
                </h3>
                <p className="text-gray-500 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's In Each Report */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy mb-10">
            What&apos;s In Each Report
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((item) => (
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

      {/* Delivery */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Daily Delivery",
                description:
                  "Sent to your inbox at 10:00 PM AEDT every day, seven days a week. Be prepared before the session opens.",
              },
              {
                title: "Cancel Anytime",
                description:
                  "No lock-in commitment. Cancel your subscription at any time with no questions asked.",
              },
              {
                title: "Professional Format",
                description:
                  "Clean, scannable layout designed for fast decision-making. Bias, risk scores, and catalysts at a glance.",
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

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Start Your Edge Tomorrow
          </h2>
          <p className="text-gray-300 mb-8">
            Get your first report tonight. Institutional-grade macro analysis
            delivered daily for less than the cost of a coffee.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://shop.jsfinancials.com.au/products/jsf-weekly-macroeconomic-fx-reports"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Subscribe — $39.99/mo
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
