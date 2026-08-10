"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ContentItem {
  id: string;
  type: string;
  title: string;
  description: string | null;
  period: number | null;
  topic_slug: string | null;
  storage_path: string | null;
  video_url: string | null;
  sort_order: number;
}

const TYPES = [
  { value: "period_doc", label: "Period Document" },
  { value: "topic_doc", label: "Topic Document" },
  { value: "applicability_module", label: "Applicability Module" },
  { value: "video", label: "Video" },
  { value: "resource", label: "Resource" },
];

export default function ContentManager({ items }: { items: ContentItem[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/portal/admin/content", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create content");
      setLoading(false);
      return;
    }

    setShowForm(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this content item?")) return;
    await fetch("/api/portal/admin/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  const grouped = TYPES.map((t) => ({
    ...t,
    items: items.filter((i) => i.type === t.value),
  }));

  return (
    <div className="mt-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="inline-flex items-center px-4 py-2 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors"
      >
        {showForm ? "Cancel" : "Add Content"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 border border-[#C9A84C]/20 rounded-xl p-6 bg-[#0d1a2e] space-y-4"
        >
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Type</label>
              <select
                name="type"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              >
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Title</label>
              <input
                name="title"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={2}
              className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Period (1-12, for period docs)
              </label>
              <input
                name="period"
                type="number"
                min={1}
                max={12}
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Topic Slug
              </label>
              <input
                name="topic_slug"
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
                placeholder="e.g. autocorrelation"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Sort Order
              </label>
              <input
                name="sort_order"
                type="number"
                defaultValue={0}
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Video URL (YouTube or Loom)
            </label>
            <input
              name="video_url"
              type="url"
              className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              File Upload (PDF)
            </label>
            <input
              name="file"
              type="file"
              accept=".pdf"
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#C9A84C]/20 file:text-[#C9A84C] file:text-sm file:font-medium hover:file:bg-[#C9A84C]/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-lg hover:bg-[#C9A84C]/90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Content"}
          </button>
        </form>
      )}

      {/* Content list grouped by type */}
      <div className="mt-8 space-y-8">
        {grouped.map((group) => (
          <div key={group.value}>
            <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-3">
              {group.label} ({group.items.length})
            </h2>
            {group.items.length > 0 ? (
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border border-white/5 rounded-lg px-4 py-3 bg-[#0d1a2e]"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-xs mt-0.5">
                        {item.period ? `Period ${item.period}` : ""}
                        {item.topic_slug ? `Topic: ${item.topic_slug}` : ""}
                        {item.storage_path ? " | Has file" : ""}
                        {item.video_url ? " | Has video" : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-600 hover:text-red-400 text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-xs">No items</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
