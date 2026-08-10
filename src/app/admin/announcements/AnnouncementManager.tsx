"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Announcement {
  id: string;
  title: string;
  body: string | null;
  created_at: string;
}

export default function AnnouncementManager({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    await fetch("/api/portal/admin/announcement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        body: form.get("body") || null,
      }),
    });

    setShowForm(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return;
    await fetch("/api/portal/admin/announcement", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <div className="mt-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="inline-flex items-center px-4 py-2 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors"
      >
        {showForm ? "Cancel" : "New Announcement"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 border border-[#C9A84C]/20 rounded-xl p-6 bg-[#0d1a2e] space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-300 mb-1">Title</label>
            <input
              name="title"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Body</label>
            <textarea
              name="body"
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-lg disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Announcement"}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-3">
        {announcements.length > 0 ? (
          announcements.map((a) => (
            <div
              key={a.id}
              className="flex items-start justify-between border border-white/5 rounded-lg px-5 py-4 bg-[#0d1a2e]"
            >
              <div>
                <p className="text-white text-sm font-medium">{a.title}</p>
                {a.body && (
                  <p className="text-gray-500 text-xs mt-1">{a.body}</p>
                )}
                <p className="text-gray-600 text-xs mt-2">
                  {new Date(a.created_at).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-gray-600 hover:text-red-400 text-xs transition-colors shrink-0 ml-4"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="border border-white/5 rounded-xl p-8 text-center bg-[#0d1a2e]">
            <p className="text-gray-500 text-sm">
              No announcements yet. Post one to keep your clients informed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
