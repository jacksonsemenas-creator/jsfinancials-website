"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const clientNav = [
  { href: "/portal", label: "Dashboard" },
  { href: "/portal/periods", label: "Period Documents" },
  { href: "/portal/topics", label: "Topic Documents" },
  { href: "/portal/modules", label: "Modules" },
  { href: "/portal/videos", label: "Video Library" },
];

const adminNav = [
  { href: "/admin", label: "Admin Overview" },
  { href: "/admin/content", label: "Content Manager" },
  { href: "/admin/clients", label: "Client Manager" },
  { href: "/admin/announcements", label: "Announcements" },
];

export default function PortalSidebar({
  fullName,
  role,
  currentPeriod,
}: {
  fullName: string;
  role: "client" | "admin";
  currentPeriod: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  const nav = (
    <>
      <div className="px-5 py-6 border-b border-[#C9A84C]/10">
        <p className="text-xs text-gray-500 uppercase tracking-widest">
          Mentorship
        </p>
        <p className="mt-1 text-white font-heading font-semibold text-sm truncate">
          {fullName}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          Period {currentPeriod} of 12
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {clientNav.map((item) => {
          const isActive =
            item.href === "/portal"
              ? pathname === "/portal"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        {role === "admin" && (
          <>
            <div className="pt-4 pb-2 px-3">
              <p className="text-xs text-gray-600 uppercase tracking-widest">
                Admin
              </p>
            </div>
            {adminNav.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      <div className="px-3 py-4 border-t border-[#C9A84C]/10">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-[#C9A84C] text-[#0A1628] p-3 rounded-full shadow-lg"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-[#060d1a] border-r border-[#C9A84C]/10 flex flex-col transform transition-transform pt-16 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 border-r border-[#C9A84C]/10 bg-[#060d1a] flex-col">
        {nav}
      </aside>
    </>
  );
}
