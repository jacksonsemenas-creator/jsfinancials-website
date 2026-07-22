import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Library",
};

export default async function ResearchPage() {
  const supabase = await createClient();
  const { data: resources } = await supabase
    .from("research_resources")
    .select("id, title, description, resource_type, file_path, video_url")
    .order("created_at", { ascending: false });

  const pdfs = resources?.filter((r) => r.resource_type === "pdf") ?? [];
  const videos = resources?.filter((r) => r.resource_type === "video") ?? [];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Research Library
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Additional research, videos, papers, and resources for members.
      </p>

      <div className="mt-8 space-y-10">
        {/* PDFs */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white text-sm font-medium">
                Research Papers and Documents
              </h2>
              <p className="text-gray-500 text-xs">
                In-depth analysis and research notes.
              </p>
            </div>
          </div>

          {pdfs.length > 0 ? (
            <div className="space-y-2">
              {pdfs.map((item) => (
                <a
                  key={item.id}
                  href={`/api/files/${item.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3.5 bg-navy-light hover:border-gold/25 transition-colors group"
                >
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-gray-500 text-xs mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-gold shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              ))}
            </div>
          ) : (
            <div className="border border-gold/10 rounded-lg bg-navy-light p-6 text-center">
              <p className="text-gray-500 text-sm">
                Research papers will be added here as they become available.
              </p>
            </div>
          )}
        </div>

        {/* Videos */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white text-sm font-medium">Videos</h2>
              <p className="text-gray-500 text-xs">
                Recorded sessions, market breakdowns, and tutorials.
              </p>
            </div>
          </div>

          {videos.length > 0 ? (
            <div className="space-y-2">
              {videos.map((item) => (
                <a
                  key={item.id}
                  href={item.video_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3.5 bg-navy-light hover:border-gold/25 transition-colors group"
                >
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-gray-500 text-xs mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-gold shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          ) : (
            <div className="border border-gold/10 rounded-lg bg-navy-light p-6 text-center">
              <p className="text-gray-500 text-sm">
                Videos will be added here as they become available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
