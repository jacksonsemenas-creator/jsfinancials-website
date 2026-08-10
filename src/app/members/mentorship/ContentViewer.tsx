"use client";

import { useState } from "react";

interface ContentItem {
  id: string;
  type: string;
  title: string;
  description: string | null;
  period: number | null;
  storage_path: string | null;
  video_url: string | null;
}

export default function ContentViewer({
  item,
  clientId,
  completed: initialCompleted,
}: {
  item: ContentItem;
  clientId: string;
  completed: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(initialCompleted);

  async function handleDownload() {
    if (!item.storage_path) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/portal/file?contentId=${item.id}`
      );
      if (!res.ok) {
        alert("Unable to generate download link.");
        setLoading(false);
        return;
      }
      const { url } = await res.json();
      window.open(url, "_blank");
    } catch {
      alert("Something went wrong.");
    }
    setLoading(false);
  }

  async function toggleComplete() {
    const method = completed ? "DELETE" : "POST";
    const res = await fetch("/api/portal/progress", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentId: item.id }),
    });
    if (res.ok) setCompleted(!completed);
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          {item.period && (
            <p className="text-xs text-[#C9A84C] uppercase tracking-widest mb-1">
              Period {item.period}
            </p>
          )}
          <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
            {item.title}
          </h1>
          {item.description && (
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Video embed */}
      {item.video_url && (
        <div className="aspect-video rounded-xl overflow-hidden bg-black mb-6">
          <iframe
            src={normalizeVideoUrl(item.video_url)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Download button for documents */}
      {item.storage_path && (
        <button
          onClick={handleDownload}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A1628] font-semibold text-sm rounded-lg hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-50 mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {loading ? "Generating link..." : "Download Document"}
        </button>
      )}

      {/* Mark complete */}
      <div className="border-t border-white/10 pt-4">
        <button
          onClick={toggleComplete}
          className={`inline-flex items-center gap-2 text-sm transition-colors ${
            completed
              ? "text-[#C9A84C]"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {completed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <circle cx="12" cy="12" r="9" strokeWidth={2} />
            )}
          </svg>
          {completed ? "Completed" : "Mark as complete"}
        </button>
      </div>
    </div>
  );
}

function normalizeVideoUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Loom
  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`;

  return url;
}
