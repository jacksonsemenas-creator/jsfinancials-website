import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Mentorship",
};

export default async function ResourcesPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: resources } = await supabase
    .from("content_items")
    .select("id, title, description, storage_path, video_url")
    .eq("type", "resource")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Resource Vault
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Supplementary materials, data files, reference documents, and tools
        to support your mentorship work.
      </p>

      <div className="mt-8">
        {resources && resources.length > 0 ? (
          <div className="space-y-2">
            {resources.map((item) => (
              <ResourceRow key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="border border-gold/10 rounded-xl p-8 text-center bg-navy-light">
            <p className="text-gray-500 text-sm">
              No resources have been unlocked yet. Supplementary materials will
              appear here as they are assigned.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResourceRow({
  item,
}: {
  item: {
    id: string;
    title: string;
    description: string | null;
    storage_path: string | null;
    video_url: string | null;
  };
}) {
  if (item.video_url) {
    return (
      <a
        href={item.video_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3.5 bg-navy-light hover:border-gold/30 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-gold/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
              {item.title}
            </p>
            {item.description && (
              <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
            )}
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-600 group-hover:text-gold shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={`/api/portal/file?contentId=${item.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3.5 bg-navy-light hover:border-gold/30 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <svg className="w-4 h-4 text-gold/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div>
          <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
            {item.title}
          </p>
          {item.description && (
            <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
          )}
        </div>
      </div>
      <svg className="w-4 h-4 text-gray-600 group-hover:text-gold shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </a>
  );
}
