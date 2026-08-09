"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

import Image from "next/image";

// ── Config: edit all links here ──────────────────────────────────────────────

const PROFILE = {
  image: "/images/logo.png",
  name: "Jackson Semenas",
  subtitle: "Quantitative Trader | Founder, JS Financials",
};

const PRIMARY_LINK = {
  title: "Quantitative Trading Mentorship",
  description:
    "6 months of 1-on-1 mentorship. Build a fully validated trading model with Jackson.",
  href: "/products/mentorship",
  external: false,
};

const LINKS = [
  {
    title: "Prediction Markets Trading Course",
    href: "https://buy.stripe.com/14AaEZ62n0RZ31e6ZC6J20c",
    external: true,
  },
  {
    title: "Daily Macro Report",
    href: "https://buy.stripe.com/3cI00l9ezasz0T6gAc6J205",
    external: true,
  },
  {
    title: "Join the Discord Community",
    href: "https://www.launchpass.com/js-financials/quantitativetrading",
    external: true,
  },
];

const AFFILIATE_LINK = {
  title: "Trade Prediction Markets on Kalshi",
  href: "https://kalshi.com/p/Semenas",
  disclosure: "Affiliate link. I may earn a commission.",
};

const SOCIALS = [
  {
    name: "YouTube",
    href: "https://youtube.com/@js_financials?si=oI05HrXpS8lKvUx_",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/js.financials_?igsh=a2Y5aTZnb3FoN25y&utm_source=qr",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@jsfinancials?_r=1&_t=ZS-98jbmiXMFxk",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.21 8.21 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/186514fNVB/?mibextid=wwXIfr",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/jsfinancials?s=11",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jackson-semenas-4285b937b?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// ── Click tracking stub ──────────────────────────────────────────────────────

function trackClick(label: string) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "link_click", { link_label: label });
    }
    console.log("[links] click:", label);
  } catch {
    // silent
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export default function LinksContent() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex justify-center px-4 py-12">
      <div className="w-full max-w-[480px] flex flex-col items-center">
        {/* Profile */}
        <div className="mb-8 text-center">
          <Image
            src={PROFILE.image}
            alt={PROFILE.name}
            width={88}
            height={88}
            className="rounded-full mx-auto mb-4 border-2 border-[#C9A84C]/30"
          />
          <h1 className="text-white font-heading text-xl font-bold tracking-wide">
            {PROFILE.name}
          </h1>
          <p className="text-gray-400 text-sm mt-1">{PROFILE.subtitle}</p>
        </div>

        {/* Primary CTA */}
        <a
          href={PRIMARY_LINK.href}
          {...(PRIMARY_LINK.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          onClick={() => trackClick(PRIMARY_LINK.title)}
          className="w-full mb-3 block rounded-xl border-2 border-[#C9A84C] bg-[#C9A84C]/5 p-5 text-center transition-all hover:bg-[#C9A84C]/15 hover:shadow-lg hover:shadow-[#C9A84C]/10"
        >
          <span className="block text-white font-heading font-semibold text-base tracking-wide">
            {PRIMARY_LINK.title}
          </span>
          <span className="block text-gray-400 text-xs mt-1.5">
            {PRIMARY_LINK.description}
          </span>
        </a>

        {/* Secondary links */}
        {LINKS.map((link) => (
          <a
            key={link.title}
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={() => trackClick(link.title)}
            className="w-full mb-3 block rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-white font-medium text-sm tracking-wide transition-all hover:border-[#C9A84C]/40 hover:bg-white/[0.06]"
          >
            {link.title}
          </a>
        ))}

        {/* Affiliate link */}
        <a
          href={AFFILIATE_LINK.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackClick(AFFILIATE_LINK.title)}
          className="w-full mb-3 block rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3.5 text-center transition-all hover:border-white/10 hover:bg-white/[0.04]"
        >
          <span className="block text-gray-300 text-sm">
            {AFFILIATE_LINK.title}
          </span>
          <span className="block text-gray-600 text-[11px] mt-1">
            {AFFILIATE_LINK.disclosure}
          </span>
        </a>

        {/* Social icons */}
        <div className="flex items-center gap-5 mt-6">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(social.name)}
              className="text-gray-500 hover:text-[#C9A84C] transition-colors"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="text-gray-700 text-xs mt-10">
          jsfinancials.com.au
        </p>
      </div>
    </div>
  );
}
