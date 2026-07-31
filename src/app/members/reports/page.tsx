import { createClient } from "@/lib/supabase/server";
import { getUser, hasEntitlement } from "@/lib/entitlements";
import type { Metadata } from "next";
import LockedContent from "../LockedContent";
import CancelSubscription from "./CancelSubscription";

export const metadata: Metadata = {
  title: "Daily Reports",
};

export default async function ReportsPage() {
  const user = await getUser();
  if (!user) return null;

  const hasAccess = await hasEntitlement(user.id, ["daily_report"]);
  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
          Daily Macro Reports
        </h1>
        <p className="mt-2 text-gray-400 text-sm">
          Your archive of daily macroeconomic reports. New reports are added every
          day at 10:00 PM AEDT.
        </p>
        <LockedContent title="Daily Reports" productUrl="/products/daily-reports" />
      </div>
    );
  }

  const supabase = await createClient();

  const [{ data: reports }, { data: entitlement }] = await Promise.all([
    supabase
      .from("daily_reports")
      .select("id, title, report_date, file_path")
      .order("report_date", { ascending: false }),
    supabase
      .from("entitlements")
      .select("current_period_end")
      .eq("user_id", user.id)
      .eq("product", "daily_report")
      .eq("status", "active")
      .limit(1)
      .single(),
  ]);

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
            Daily Macro Reports
          </h1>
          <p className="mt-2 text-gray-400 text-sm">
            Your archive of daily macroeconomic reports. New reports are added every
            day at 10:00 PM AEDT.
          </p>
        </div>
      </div>

      <CancelSubscription periodEnd={entitlement?.current_period_end ?? null} />

      <div className="mt-8">
        {reports && reports.length > 0 ? (
          <div className="space-y-2">
            {reports.map((report) => (
              <a
                key={report.id}
                href={`/api/files/${report.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3.5 bg-navy-light hover:border-gold/25 transition-colors group"
              >
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                    {report.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {new Date(report.report_date + "T00:00:00").toLocaleDateString("en-AU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gold shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            ))}
          </div>
        ) : (
          <div className="border border-gold/10 rounded-lg bg-navy-light p-8 text-center">
            <div className="text-gold/40 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">
              No reports uploaded yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
