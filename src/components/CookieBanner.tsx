"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy-dark border-t border-gold/20 px-4 py-4 sm:py-3">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-gray-300 text-sm leading-relaxed">
          This site uses strictly necessary cookies for authentication and
          anonymised analytics via Vercel Analytics (no tracking cookies). By
          continuing to use the site, you accept our{" "}
          <Link
            href="/privacy"
            className="text-gold hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
