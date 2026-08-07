"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who are these products for?",
    a: "Traders and students at any level who want to understand how financial markets actually work. Whether you are a complete beginner looking to build a foundation in macroeconomics, a discretionary trader wanting to add systematic methods, or an experienced quant looking for new frameworks, there is a product designed for where you are right now.",
  },
  {
    q: "Do I need coding or maths experience?",
    a: "Not at all. The Macro Course and Daily Reports require zero technical background. The Prediction Markets Course includes Python code templates but is designed so you can follow along even if you have never coded before. The Bootcamp is fully personalised to your skill level, so Jackson will meet you where you are.",
  },
  {
    q: "What makes JS Financials different from other trading education?",
    a: "Most trading education sells signals, hype, or surface-level technical analysis. JS Financials is built on the same quantitative methods and macroeconomic frameworks used by institutional desks. Every strategy is backed by data, statistical validation, and rigorous research. Jackson is an active quant trader and researcher, not a content creator who stopped trading years ago.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes. Both the Daily Reports and Discord subscriptions can be cancelled at any time from your member dashboard with no lock-in, no questions asked. You keep access until the end of your current billing period.",
  },
  {
    q: "How do I access my content after purchasing?",
    a: "After purchasing, go to jsfinancials.com.au/forgot-password to set your password using the same email you used at checkout. Then log in at jsfinancials.com.au/login and your purchased content will be unlocked automatically.",
  },
  {
    q: "What is included in the Daily Macro Reports?",
    a: "Each report covers 40+ FX pairs, 9 commodities, 9 equity indices, and 8 cryptocurrencies. You get a global macro overview, fundamental analysis for every asset class, and a comprehensive dashboard with directional bias, risk scores, and tradability rankings. Reports are delivered to your inbox every day at 10:00 PM AEDT and archived in the member portal.",
  },
  {
    q: "How does the 6-Month Bootcamp work?",
    a: "You get three live calls per week with Jackson over six months via Google Meet. The curriculum starts with macro and quantitative foundations, moves into model development and Python coding, and finishes with statistical validation and live deployment. By the end, you will have built a fully backtested, institutional-standard trading model. You also get the Daily Reports, Discord access, and 300+ learning documents included.",
  },
  {
    q: "I am not sure which product is right for me. Can I get advice?",
    a: "Absolutely. Book a free 30-minute call with Jackson at calendly.com/jsfinancialsaustralia/30min and he will recommend the best starting point based on your experience, goals, and budget. No pressure, no sales pitch.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-heading font-semibold text-navy pr-4">
                {faq.q}
              </h3>
              <svg
                className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 pb-5 px-5" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
