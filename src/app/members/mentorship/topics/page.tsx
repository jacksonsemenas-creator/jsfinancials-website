import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Topic Documents | Mentorship",
};

export default async function TopicsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: topics } = await supabase
    .from("content_items")
    .select("id, title, description, topic_slug")
    .eq("type", "topic_doc")
    .order("title", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Topic Documents
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Standalone reference documents on specific quantitative and macro topics.
      </p>

      <div className="mt-8">
        {topics && topics.length > 0 ? (
          <div className="space-y-2">
            {topics.map((topic) => (
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
                <svg className="w-4 h-4 text-gray-600 group-hover:text-gold shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
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
