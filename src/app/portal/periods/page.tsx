import { getProfile } from "@/lib/portal";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Period Documents | Mentorship Portal",
};

export default async function PeriodsPage() {
  const profile = await getProfile();
  const supabase = await createClient();

  // Get all period docs the client has access to
  const { data: accessRows } = await supabase
    .from("client_access")
    .select("content_id")
    .eq("client_id", profile.id);

  const accessIds = new Set((accessRows ?? []).map((r) => r.content_id));

  // Get all period_doc content items (admin sees all, client sees unlocked via RLS)
  const { data: periodDocs } = await supabase
    .from("content_items")
    .select("id, title, description, period, storage_path")
    .eq("type", "period_doc")
    .order("period", { ascending: true });

  // Build a grid of 12 periods
  const periods = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const doc = periodDocs?.find((d) => d.period === num);
    const unlocked = doc ? accessIds.has(doc.id) || profile.role === "admin" : false;
    return { num, doc, unlocked };
  });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Period Documents
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Your curriculum is split into 12 periods. Each period unlocks as you
        progress through the mentorship.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {periods.map((p) => (
          <div key={p.num}>
            {p.unlocked && p.doc ? (
              <Link
                href={`/portal/periods/${p.doc.id}`}
                className="block border border-[#C9A84C]/20 rounded-xl p-5 bg-[#0d1a2e] hover:border-[#C9A84C]/50 transition-colors group"
              >
                <p className="text-xs text-[#C9A84C] uppercase tracking-widest mb-1">
                  Period {p.num}
                </p>
                <p className="text-white font-heading font-semibold text-sm group-hover:text-[#C9A84C] transition-colors">
                  {p.doc.title}
                </p>
                {p.doc.description && (
                  <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">
                    {p.doc.description}
                  </p>
                )}
              </Link>
            ) : (
              <div className="border border-white/5 rounded-xl p-5 bg-[#0d1a2e]/50 opacity-50">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">
                  Period {p.num}
                </p>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-gray-600 text-sm">Locked</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
