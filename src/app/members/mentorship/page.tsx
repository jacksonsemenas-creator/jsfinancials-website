import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentorship Dashboard",
};

export default async function MentorshipDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return (
      <div>
        <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
          1-on-1 Mentorship
        </h1>
        <div className="mt-8 border border-gold/10 rounded-xl p-8 text-center bg-navy-light">
          <p className="text-gray-400 text-sm">
            You do not have an active mentorship enrolment. If you believe this
            is an error, contact hello@jsfinancials.com.au.
          </p>
        </div>
      </div>
    );
  }

  const firstName = profile.full_name?.split(" ")[0] ?? "there";

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

      {/* Start Here card for new clients */}
      {profile.current_period === 1 && completed === 0 && (
        <div className="mt-8 border-2 border-gold/40 rounded-xl p-6 bg-gold/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <h2 className="text-white font-heading font-semibold text-lg">
              Start Here
            </h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-5">
            Welcome to the mentorship. Here is how to get started. Read the
            syllabus first to understand the full 12-period structure, then open
            Period 1 and work through it before your next call. Submit your work
            through the Submissions tab when you are ready for feedback.
          </p>
          <div className="space-y-2">
            <a
              href="/members/mentorship/periods"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-navy-light border border-gold/20 hover:border-gold/40 transition-colors group"
            >
              <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                  Read the Master Syllabus
                </p>
                <p className="text-gray-500 text-xs">
                  Understand the full curriculum and what each period covers.
                </p>
              </div>
            </a>
            <a
              href="/members/mentorship/periods"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-navy-light border border-gold/20 hover:border-gold/40 transition-colors group"
            >
              <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                  Open Period 1
                </p>
                <p className="text-gray-500 text-xs">
                  Download the document and companion data files. Work through the exercises.
                </p>
              </div>
            </a>
            <a
              href="/members/mentorship/submissions"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-navy-light border border-gold/20 hover:border-gold/40 transition-colors group"
            >
              <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                  Submit Your Work
                </p>
                <p className="text-gray-500 text-xs">
                  Upload your code, notebooks, or write-ups for Jackson to review.
                </p>
              </div>
            </a>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        <div className="border border-gold/20 rounded-xl p-6 bg-navy-light">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            Current Period
          </p>
          <p className="text-4xl font-heading font-bold text-gold">
            {profile.current_period}
          </p>
          <p className="text-gray-400 text-sm mt-1">of 12 periods</p>
          {profile.track && (
            <p className="text-xs text-gray-500 mt-3">
              Track: {profile.track.replace(/_/g, " ")}
            </p>
          )}
        </div>

        <div className="border border-gold/20 rounded-xl p-6 bg-navy-light">
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
              className="h-full bg-gold rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {latestAnnouncement && (
        <div className="mt-8 border border-gold/20 rounded-xl p-6 bg-navy-light">
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
