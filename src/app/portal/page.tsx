import { getProfile } from "@/lib/portal";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Mentorship Portal",
};

export default async function PortalDashboard() {
  const profile = await getProfile();
  const supabase = await createClient();

  const firstName = profile.full_name?.split(" ")[0] ?? "there";

  // Fetch progress stats
  const [
    { count: completedCount },
    { count: unlockedCount },
    { data: latestAnnouncement },
  ] = await Promise.all([
    supabase
      .from("progress_items")
      .select("*", { count: "exact", head: true })
      .eq("client_id", profile.id),
    supabase
      .from("client_access")
      .select("*", { count: "exact", head: true })
      .eq("client_id", profile.id),
    supabase
      .from("announcements")
      .select("title, body, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
  ]);

  const completed = completedCount ?? 0;
  const total = unlockedCount ?? 0;
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Welcome back, {firstName}
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Your mentorship dashboard. Period {profile.current_period} of 12.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        {/* Current Period */}
        <div className="border border-[#C9A84C]/20 rounded-xl p-6 bg-[#0d1a2e]">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            Current Period
          </p>
          <p className="text-4xl font-heading font-bold text-[#C9A84C]">
            {profile.current_period}
          </p>
          <p className="text-gray-400 text-sm mt-1">of 12 periods</p>
          {profile.track && (
            <p className="text-xs text-gray-500 mt-3">
              Track: {profile.track.replace(/_/g, " ")}
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="border border-[#C9A84C]/20 rounded-xl p-6 bg-[#0d1a2e]">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            Progress
          </p>
          <p className="text-4xl font-heading font-bold text-white">
            {progressPct}%
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {completed} of {total} items completed
          </p>
          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9A84C] rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Latest Announcement */}
      {latestAnnouncement && (
        <div className="mt-8 border border-[#C9A84C]/20 rounded-xl p-6 bg-[#0d1a2e]">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            Latest Announcement
          </p>
          <h2 className="text-white font-heading font-semibold text-lg">
            {latestAnnouncement.title}
          </h2>
          {latestAnnouncement.body && (
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              {latestAnnouncement.body}
            </p>
          )}
          <p className="text-gray-600 text-xs mt-3">
            {new Date(latestAnnouncement.created_at).toLocaleDateString(
              "en-AU",
              { day: "numeric", month: "long", year: "numeric" }
            )}
          </p>
        </div>
      )}
    </div>
  );
}
