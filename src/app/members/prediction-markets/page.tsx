import { createClient } from "@/lib/supabase/server";
import { getUser, hasEntitlement } from "@/lib/entitlements";
import type { Metadata } from "next";
import LockedContent from "../LockedContent";

export const metadata: Metadata = {
  title: "Prediction Markets Course",
};

export default async function PredictionMarketsPage() {
  const user = await getUser();
  if (!user) return null;

  const hasAccess = await hasEntitlement(user.id, ["prediction_markets"]);
  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
          Prediction Market Trading Course
        </h1>
        <p className="mt-2 text-gray-400 text-sm">
          A complete guide to trading prediction markets. From fundamentals to
          advanced strategies, arbitrage, and building systematic edges.
        </p>
        <LockedContent title="Prediction Markets Course" productUrl="/products/prediction-markets" />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: materials } = await supabase
    .from("course_materials")
    .select("id, title, module_number, description, file_path")
    .eq("course", "prediction_markets")
    .order("module_number", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Prediction Market Trading Course
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        A complete guide to trading prediction markets. From fundamentals to
        advanced strategies, arbitrage, and building systematic edges.
      </p>

      <div className="mt-8">
        {materials && materials.length > 0 ? (
          <div className="space-y-3">
            {materials.map((mat) => (
              <a
                key={mat.id}
                href={`/api/files/${mat.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 border border-gold/10 rounded-lg px-5 py-4 bg-navy-light hover:border-gold/25 transition-colors group"
              >
                {mat.module_number != null && (
                  <span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold text-sm font-semibold flex items-center justify-center">
                    {mat.module_number}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                    {mat.title}
                  </p>
                  {mat.description && (
                    <p className="text-gray-500 text-xs mt-1">
                      {mat.description}
                    </p>
                  )}
                </div>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gold shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            ))}
          </div>
        ) : (
          <div className="border border-gold/10 rounded-lg bg-navy-light p-8 text-center">
            <p className="text-gray-400 text-sm">
              Course materials are being uploaded. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
