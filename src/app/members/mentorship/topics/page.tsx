import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Topic Documents | Mentorship",
};

const GROUPS = [
  { label: "Statistical Methods", min: 1, max: 19 },
  { label: "Data", min: 20, max: 29 },
  { label: "Econometric Models", min: 30, max: 39 },
  { label: "Macroeconomics", min: 40, max: 49 },
  { label: "Market Structure", min: 50, max: 59 },
  { label: "Risk Management", min: 60, max: 69 },
  { label: "Code and Infrastructure", min: 70, max: 79 },
  { label: "Mathematics", min: 80, max: 89 },
];

export default async function TopicsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: topics } = await supabase
    .from("content_items")
    .select("id, title, description, topic_slug, sort_order")
    .eq("type", "topic_doc")
    .order("sort_order", { ascending: true });

  const grouped = GROUPS.map((group) => ({
    ...group,
    items: (topics ?? []).filter(
      (t) => t.sort_order >= group.min && t.sort_order <= group.max
    ),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Topic Documents
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Standalone reference documents on specific quantitative, macro, and
        infrastructure topics.
      </p>

      <div className="mt-8 space-y-10">
        {grouped.length > 0 ? (
          grouped.map((group) => (
            <div key={group.label}>
              <h2 className="text-sm text-gold uppercase tracking-widest mb-3">
                {group.label}
              </h2>
              <div className="space-y-2">
                {group.items.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/members/mentorship/topics/${topic.id}`}
                    className="flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3.5 bg-navy-light hover:border-gold/30 transition-colors group"
                  >
                    <div>
                      <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                        {topic.title}
                      </p>
                      {topic.description && (
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                          {topic.description}
                        </p>
                      )}
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-600 group-hover:text-gold shrink-0 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="border border-gold/10 rounded-xl p-8 text-center bg-navy-light">
            <p className="text-gray-500 text-sm">
              No topic documents have been unlocked yet. These will appear as
              Jackson assigns them during your mentorship.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
