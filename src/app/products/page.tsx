import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore JS Financials products: macroeconomic courses, daily reports, 1-on-1 mentorship, and quantitative trading Discord.",
};

const products = [
  {
    title: "JSF Macroeconomics for Financial Markets & Trading",
    price: "$199",
    period: "AUD one-time",
    type: "Course",
    description:
      "A comprehensive course designed to teach you how macroeconomic forces drive asset prices across global markets. Built from the same frameworks used by institutional traders.",
    features: [
      "Central bank policy mechanics & rate expectations",
      "Yield curve analysis & fixed income dynamics",
      "Cross-asset macro frameworks (equities, FX, commodities)",
      "Inflation, employment & growth data interpretation",
      "Applied macro trading strategies with real examples",
      "Self-paced, lifetime access to all materials",
    ],
    href: "https://shop.jsfinancials.com.au/products/jsf-macroeconomics-for-financial-markets-trading",
    cta: "Enrol Now",
    highlight: false,
  },
  {
    title: "JSF Daily Macroeconomic Reports",
    price: "$39.99",
    period: "AUD / month",
    type: "Subscription",
    description:
      "Institutional-quality daily briefings covering global macro conditions, key data releases, and actionable insights. Know what's moving markets before you trade.",
    features: [
      "Daily pre-market macro analysis",
      "Key economic data release breakdowns",
      "Cross-asset positioning & flow insights",
      "Central bank watch & rate path expectations",
      "Weekly deep-dive research notes",
      "Delivered to your inbox every day",
    ],
    href: "https://shop.jsfinancials.com.au/products/jsf-weekly-macroeconomic-fx-reports",
    cta: "Subscribe",
    highlight: false,
  },
  {
    title: "JSF 1-on-1 Mentorship: 12-Week Trading Curriculum",
    price: "$3,000",
    period: "AUD one-time",
    type: "Mentorship",
    description:
      "A personalised 12-week intensive program tailored to your goals. Covers quantitative methods, model development, risk management, and live market application, all with direct access to Jackson.",
    features: [
      "Weekly 1-on-1 video sessions with Jackson",
      "Personalised curriculum based on your level",
      "Hands-on model development & backtesting",
      "Risk management & portfolio construction",
      "Live market application & trade review",
      "Ongoing support throughout the program",
      "12 month trading plan included at the end of the initial 12 weeks",
    ],
    href: "https://shop.jsfinancials.com.au/products/1-on-1-mentorship-jsf",
    cta: "Join Now",
    highlight: true,
  },
  {
    title: "JSF Quantitative Trading Discord",
    price: "$50",
    period: "AUD / month",
    type: "Community",
    description:
      "A private community of serious quantitative traders. Get live model signals, participate in macro discussions, collaborate on strategy development, and access real-time market analysis.",
    features: [
      "Live model signals & trade alerts",
      "Real-time macro & market discussion",
      "Strategy development & code sharing",
      "Direct access to Jackson for Q&A",
      "Research paper discussions",
      "Network with other quant traders",
    ],
    href: "https://www.launchpass.com/js-financials/quantitativetrading",
    cta: "Join Discord",
    highlight: false,
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Products & Services
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From self-paced education to live community and personalised
            mentorship: choose the level that fits your trading journey.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.title}
                className={`bg-white rounded-2xl border p-8 flex flex-col ${
                  product.highlight
                    ? "border-gold shadow-lg ring-1 ring-gold/20"
                    : "border-gray-200"
                }`}
              >
                {product.highlight && (
                  <div className="inline-flex self-start items-center px-3 py-1 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                    Most Comprehensive
                  </div>
                )}
                <div className="inline-flex self-start items-center px-2 py-0.5 bg-navy/5 text-navy text-xs font-medium rounded mb-3">
                  {product.type}
                </div>
                <h2 className="font-heading text-xl font-bold text-navy mb-3">
                  {product.title}
                </h2>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-navy">
                    {product.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    {product.period}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 text-gold mt-0.5 shrink-0"
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
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors w-full ${
                    product.highlight
                      ? "bg-gold hover:bg-gold-light text-navy"
                      : "bg-navy hover:bg-navy-light text-white"
                  }`}
                >
                  {product.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Call CTA */}
      <section className="bg-navy py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Not Sure Which Product Is Right for You?
          </h2>
          <p className="text-gray-300 mb-6">
            Book a free 30-minute call with Jackson to discuss your goals and
            find the best fit for your trading journey.
          </p>
          <a
            href="https://calendly.com/jsfinancialsaustralia/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
          >
            Book a 30-Min Call
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-12">
            Frequently Asked Questions
          </h2>
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
