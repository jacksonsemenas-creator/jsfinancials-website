import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Members Dashboard",
};

const productLabels: Record<string, string> = {
  daily_report: "Daily Macro Reports",
  macro_course: "Macroeconomics Course",
  prediction_markets: "Prediction Markets",
  discord: "Discord Community",
  bootcamp: "1-on-1 Mentorship",
};

export default async function MembersPage() {
  const user = await getUser();
  if (!user) return null;

  const firstName =
    user.user_metadata?.first_name ??
    user.user_metadata?.full_name?.split(" ")[0] ??
    "there";

  const supabase = await createClient();
  const { data: entitlements } = await supabase
    .from("entitlements")
    .select("product, status, current_period_end")
    .eq("user_id", user.id)
    .eq("status", "active");

  const quickLinks = [
    {
      href: "/members/reports",
      label: "Daily Reports",
      description: "View your macro report archive",
    },
    {
      href: "/members/macro-course",
      label: "Macro Course",
      description: "Continue the course material",
    },
    {
      href: "/members/prediction-markets",
      label: "Prediction Markets",
      description: "Prediction market trading course",
    },
    {
      href: "/members/research",
      label: "Research Library",
      description: "Videos, papers, and resources",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Welcome back, {firstName}
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Your member dashboard. Access your content and manage your account.
      </p>

      {/* Active subscriptions */}
      <div className="mt-8">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
          Active Subscriptions
        </h2>
        {entitlements && entitlements.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {entitlements.map((ent) => (
              <div
                key={ent.product}
                className="border border-gold/20 rounded-lg px-4 py-3 bg-navy-light"
              >
                <p className="text-white text-sm font-medium">
                  {productLabels[ent.product] ?? ent.product}
                </p>
                {ent.current_period_end && (
                  <p className="text-xs text-gray-500 mt-1">
                    Renews{" "}
                    {new Date(ent.current_period_end).toLocaleDateString(
                      "en-AU",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gold/10 rounded-lg px-4 py-3 bg-navy-light">
            <p className="text-gray-500 text-sm">
              No active subscriptions. Your entitlements will appear here once
              activated.
            </p>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
          Quick Access
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group border border-gold/10 rounded-lg px-5 py-4 bg-navy-light hover:border-gold/30 transition-colors"
            >
              <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
