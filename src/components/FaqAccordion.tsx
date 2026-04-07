"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who are these products for?",
    a: "Anyone serious about understanding how financial markets actually work, from aspiring quant traders to experienced discretionary traders looking to add systematic, data-driven methods to their toolkit.",
  },
  {
    q: "Do I need coding experience?",
    a: "No, everything is tailored to your experience and skillset.",
  },
  {
    q: "What makes this different from other trading education?",
    a: "This isn't generic retail trading content. The research and models are built on the same quantitative methods and macroeconomic frameworks used by institutional desks. Everything is backed by data, not hype.",
  },
  {
    q: "Can I cancel the subscriptions?",
    a: "Yes, both the Daily Reports and Discord subscriptions can be cancelled at any time with no lock-in commitment.",
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
                isOpen ? "max-h-60 pb-5 px-5" : "max-h-0"
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
