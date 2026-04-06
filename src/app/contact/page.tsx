"use client";

import { useForm, ValidationError } from "@formspree/react";

const socials = [
  {
    name: "Instagram",
    handle: "@js_financials",
    href: "https://www.instagram.com/js_financials",
  },
  {
    name: "TikTok",
    handle: "@jsfinancials",
    href: "https://www.tiktok.com/@jsfinancials",
  },
  {
    name: "YouTube",
    handle: "@js_financials",
    href: "https://youtube.com/@js_financials",
  },
  {
    name: "Twitter / X",
    handle: "@jacksonsemenas",
    href: "https://x.com/jacksonsemenas",
  },
  {
    name: "LinkedIn",
    handle: "Jackson Semenas",
    href: "https://www.linkedin.com/in/jackson-semenas-4285b937b",
  },
];

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xzdkyelk");

  return (
    <>
      {/* Header */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have a question about products, research, or mentorship?
            Reach out and I&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-6">
                Send a Message
              </h2>
              {state.succeeded ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <p className="text-green-800 font-medium">
                    Thanks for reaching out! I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors"
                    />
                    <ValidationError field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors"
                    />
                    <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors"
                    >
                      <option>General Enquiry</option>
                      <option>Mentorship</option>
                      <option>Products</option>
                      <option>Research Collaboration</option>
                      <option>Media / Press</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors resize-none"
                    />
                    <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full px-6 py-3 bg-navy hover:bg-navy-light text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {state.submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Socials */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy mb-6">
                Connect
              </h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Follow JS Financials across social media for daily macro
                insights, model updates, and trading content.
              </p>
              <div className="space-y-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gold/40 hover:bg-gold/5 transition-all group"
                  >
                    <div>
                      <div className="font-medium text-navy text-sm">
                        {social.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {social.handle}
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-300 group-hover:text-gold transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
