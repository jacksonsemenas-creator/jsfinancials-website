"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "@formspree/react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const testimonials = [
  {
    quote:
      "For a kid who's just 18 years old I'm truly blown away with his knowledge. I bought the macroeconomics course and then 2 weeks later signed up to the mentorship (3 weeks in now). Can't express how useful Jackson has been, thank you!",
    name: "Alex K",
  },
  {
    quote:
      "I'm currently doing a bachelor in economics, when I say that Jackson teaches macroeconomics better than my college professor I mean it. He actually teaches how to apply the theory to trading, how various macro factors affect each other and how to analyse all of this yourself. I would recommend.",
    name: "Ryan A",
  },
  {
    quote:
      "I'm a complete beginner with economics and maths (I come from a comp-sci background), however I'm finding JS Financials products (I'm in the Discord and also bought the macro course) to be very, very helpful, and that's saying something as like I said I'm a complete beginner. WELL DONE!",
    name: "Sophie K",
  },
];

const models = [
  {
    name: "Gold Cross-Asset Analysis",
    description:
      "Multi-factor model analysing cross-asset correlations, yield curves, and macro regime shifts to generate systematic gold trading signals.",
    tag: "Historically Best Performing",
  },
  {
    name: "AUDUSD Yield Differential Mean Reversion",
    description:
      "Exploits mispricings in the AUD/USD pair driven by interest rate differentials between the RBA and Federal Reserve through mean-reversion entries.",
    tag: "Forex",
  },
  {
    name: "Polymarket 5-Min BTC Latency Arbitrage",
    description:
      "High-frequency model capturing price dislocations between Polymarket prediction contracts and underlying BTC spot/derivatives markets.",
    tag: "HFT",
  },
];

const products = [
  {
    title: "Macroeconomics for Financial Markets & Trading",
    price: "$199",
    period: "one-time",
    description:
      "Comprehensive course covering how macroeconomic forces drive asset prices, from yield curves to central bank policy to cross-asset flows.",
    features: [
      "Central bank policy & interest rate mechanics",
      "Yield curve analysis & bond market dynamics",
      "Cross-asset macro frameworks",
      "Applied trading strategies",
    ],
    href: "/products/macro-course",
    cta: "Enrol Now",
  },
  {
    title: "Daily Macroeconomic Reports",
    price: "$29.99",
    period: "/month",
    description:
      "Institutional-quality daily macro briefings covering global markets, economic data releases, and actionable trading insights.",
    features: [
      "Daily pre-market analysis",
      "Key economic data breakdowns",
      "Cross-asset positioning insights",
      "Central bank watch & rate expectations",
    ],
    href: "/products/daily-reports",
    cta: "Subscribe",
  },
  {
    title: "1-on-1 Mentorship: 12-Week Curriculum",
    price: "$3,000",
    period: "one-time",
    description:
      "Personalised 12-week program covering quantitative methods, model development, risk management, and live market application.",
    features: [
      "3x 1-on-1 sessions per week",
      "Custom model development",
      "Risk management frameworks",
      "Live market application",
    ],
    href: "/products/mentorship",
    cta: "Join Now",
  },
  {
    title: "6-Month Trading Bootcamp",
    price: "$6,000",
    period: "one-time",
    description:
      "The most intensive program. 6 months of 3x weekly calls, video series, daily macro reports, model walkthroughs, and a fully built trading model.",
    features: [
      "3x calls/week for 6 months",
      "Full video series included",
      "Daily macro reports included",
      "Build a validated model together",
    ],
    href: "/products/bootcamp",
    cta: "Enrol Now",
  },
  {
    title: "Quantitative Trading Discord",
    price: "$50",
    period: "/month",
    description:
      "Join a private community of quantitative traders. Live model signals, macro discussion, strategy development, and real-time market analysis.",
    features: [
      "Live model signals & alerts",
      "Real-time macro discussion",
      "Strategy development channels",
      "Direct access to Jackson",
    ],
    href: "https://www.launchpass.com/js-financials/quantitativetrading",
    cta: "Join Discord",
  },
];

export default function Home() {
  const [signupState, handleSignup] = useForm("xzdkyelk");

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/jackson-hero.jpg"
            alt="Jackson Semenas at the New York Stock Exchange"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Quantitative Research & Education
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Algorithmic Trading,{" "}
              <span className="text-gold">Macroeconomic Research</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Institutional-grade macroeconomic analysis and quantitative
              trading models, built by a researcher, not a guru. Real
              strategies backed by real data-driven processes.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 border border-white/20 text-white hover:border-gold hover:text-gold rounded-lg transition-colors"
              >
                About Jackson
              </Link>
              <a
                href="https://calendly.com/jsfinancialsaustralia/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gold/40 text-gold hover:bg-gold hover:text-navy rounded-lg transition-colors"
              >
                Book a Call
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="bg-navy-dark border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { stat: "4+", label: "Years Trading, Researching, and Developing" },
              { stat: "99.95", label: "University Selection Rank" },
              { stat: "HFT & LFT", label: "Model Classes" },
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

      {/* Models */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Active Trading Models
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A selection of the quantitative models currently in deployment,
              spanning macro, forex, and high-frequency strategies.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {models.map((model) => (
              <motion.div
                key={model.name}
                variants={fadeUp}
                className="group border border-gray-200 rounded-xl p-6 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-block px-2 py-1 bg-navy/5 text-navy text-xs font-medium rounded mb-4">
                  {model.tag}
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy mb-3">
                  {model.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {model.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              Products & Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From self-paced courses to daily research and personalised
              mentorship: find out how JS Financials can help you.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {products.map((product) => (
              <motion.div
                key={product.title}
                variants={fadeUp}
                className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col hover:shadow-lg hover:border-gold/40 transition-all duration-300"
              >
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">
                  {product.title}
                </h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-navy">
                    {product.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    {product.period === "one-time"
                      ? " USD"
                      : ` USD${product.period}`}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
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
                {product.href.startsWith("/") ? (
                  <Link
                    href={product.href}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-navy hover:bg-navy-light text-white text-sm font-semibold rounded-lg transition-colors w-full"
                  >
                    {product.cta}
                  </Link>
                ) : (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-navy hover:bg-navy-light text-white text-sm font-semibold rounded-lg transition-colors w-full"
                  >
                    {product.cta}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
              What Students Are Saying
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col"
              >
                <svg
                  className="w-8 h-8 text-gold/40 mb-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-gold text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <span className="text-navy font-semibold text-sm">
                    {t.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/jackson-nyse.jpg"
                alt="Jackson Semenas"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-6">
                Meet Jackson Semenas
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I started trading at 14 years old, driven by a fascination
                  with how macroeconomic forces move financial markets. What
                  began as simple algorithmic experiments evolved into
                  developing production-grade HFT and LFT models across
                  multiple asset classes.
                </p>
                <p>
                  At 18, I&apos;ve achieved a 99.95 University Selection Rank
                  and been accepted into Honours in Finance, Economics, and
                  Statistics at the Australian National University. My research
                  work spans quantitative methods, market microstructure,
                  latency arbitrage, and applied statistical modelling.
                </p>
                <p>
                  In October 2025, I published an economic policy proposal for
                  balancing immigration and inflation in the Australian economy,
                  which was put forward to the Australian Treasury for review
                  and implementation.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors"
                >
                  Read more
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <a
                  href="https://calendly.com/jsfinancialsaustralia/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 text-gold text-sm font-semibold rounded-lg hover:bg-gold hover:text-navy transition-colors"
                >
                  Book a 30-Min Call
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Trade with an Edge?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join a community of data-driven traders. Get access to
            institutional-grade research, quantitative models, and personalised
            mentorship.
          </p>
          {signupState.succeeded ? (
            <p className="text-gold font-medium mb-8">
              You&apos;re signed up! We&apos;ll be in touch.
            </p>
          ) : (
            <form
              onSubmit={handleSignup}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
            >
              <input type="hidden" name="subject" value="Newsletter Signup" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              />
              <button
                type="submit"
                disabled={signupState.submitting}
                className="px-6 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {signupState.submitting ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/jsfinancialsaustralia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
            >
              Book a 30-Min Call
            </a>
            <a
              href="https://www.launchpass.com/js-financials/quantitativetrading"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-navy-light hover:bg-navy-dark text-white font-semibold rounded-lg transition-colors border border-white/20"
            >
              Join the Discord
            </a>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 border border-white/20 text-white hover:border-gold hover:text-gold rounded-lg transition-colors"
            >
              View All Products
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
