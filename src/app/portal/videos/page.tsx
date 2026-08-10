import { getProfile } from "@/lib/portal";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Video Library | Mentorship Portal",
};

export default async function VideosPage() {
  await getProfile();
  const supabase = await createClient();

  const { data: videos } = await supabase
    .from("content_items")
    .select("id, title, description, video_url")
    .eq("type", "video")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Video Library
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Recorded walkthroughs, lectures, and model breakdowns.
      </p>

      <div className="mt-8">
        {videos && videos.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={`/portal/videos/${video.id}`}
                className="border border-[#C9A84C]/10 rounded-xl p-5 bg-[#0d1a2e] hover:border-[#C9A84C]/30 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-[#C9A84C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white text-sm font-medium group-hover:text-[#C9A84C] transition-colors">
                    {video.title}
                  </p>
                </div>
                {video.description && (
                  <p className="text-gray-500 text-xs line-clamp-2">
                    {video.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-white/5 rounded-xl p-8 text-center bg-[#0d1a2e]">
            <p className="text-gray-500 text-sm">
              No videos have been unlocked yet. Video content will be added as
              you progress through the mentorship.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
