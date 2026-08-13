import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Period Documents | Mentorship",
};

export default async function PeriodsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/members");

  const { data: accessRows } = await supabase
    .from("client_access")
    .select("content_id")
    .eq("client_id", profile.id);

  const accessIds = new Set((accessRows ?? []).map((r) => r.content_id));

  const { data: periodDocs } = await supabase
    .from("content_items")
    .select("id, title, description, period, storage_path")
    .eq("type", "period_doc")
    .order("period", { ascending: true });

  // Separate syllabus (period 0) from numbered periods
  const syllabus = periodDocs?.find((d) => d.period === 0);
  const syllabusUnlocked = syllabus
    ? accessIds.has(syllabus.id) || profile.role === "admin"
    : false;

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

      {/* Syllabus card */}
      {syllabus && syllabusUnlocked && (
        <Link
          href={`/members/mentorship/periods/${syllabus.id}`}
          className="block border-2 border-gold/30 rounded-xl p-5 bg-navy-light hover:border-gold/60 transition-colors group mt-8 mb-4"
        >
          <p className="text-xs text-gold uppercase tracking-widest mb-1">
            Master Syllabus
          </p>
          <p className="text-white font-heading font-semibold text-sm group-hover:text-gold transition-colors">
            {syllabus.title}
          </p>
          {syllabus.description && (
            <p className="text-gray-500 text-xs mt-1.5">
              {syllabus.description}
            </p>
          )}
        </Link>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {periods.map((p) => (
          <div key={p.num}>
            {p.unlocked && p.doc ? (
              <Link
                href={`/members/mentorship/periods/${p.doc.id}`}
                className="block border border-gold/20 rounded-xl p-5 bg-navy-light hover:border-gold/50 transition-colors group"
              >
                <p className="text-xs text-gold uppercase tracking-widest mb-1">
                  Period {p.num}
                </p>
                <p className="text-white font-heading font-semibold text-sm group-hover:text-gold transition-colors">
                  {p.doc.title}
                </p>
                {p.doc.description && (
                  <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">
                    {p.doc.description}
                  </p>
                )}
              </Link>
            ) : (
              <div className="border border-white/5 rounded-xl p-5 bg-navy-light/50 opacity-50">
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
