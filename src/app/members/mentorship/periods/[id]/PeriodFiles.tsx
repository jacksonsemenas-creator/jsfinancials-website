"use client";

import { useState } from "react";

interface DataFile {
  id: string;
  title: string;
  storage_path: string | null;
}

export default function PeriodFiles({ files }: { files: DataFile[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleDownload(contentId: string) {
    setLoading(contentId);
    try {
      const res = await fetch(`/api/portal/file?contentId=${contentId}`);
      if (!res.ok) {
        alert("Unable to generate download link.");
        setLoading(null);
        return;
      }
      const { url } = await res.json();
      window.open(url, "_blank");
    } catch {
      alert("Something went wrong.");
    }
    setLoading(null);
  }

  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-3">
        Data Files
      </h2>
      <div className="space-y-2">
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => handleDownload(file.id)}
            disabled={loading === file.id}
            className="w-full flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3 bg-navy-light hover:border-gold/30 transition-colors group text-left"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gold/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                {file.title}
              </span>
            </div>
            <span className="text-gray-600 text-xs">
              {loading === file.id ? "Generating link..." : "Download"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
