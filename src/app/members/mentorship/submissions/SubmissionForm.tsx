"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmissionForm({
  contentItems,
}: {
  contentItems: { id: string; title: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/portal/submissions", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to submit");
      setLoading(false);
      return;
    }

    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-4 py-2 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
      >
        {open ? "Cancel" : "New Submission"}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 border border-gold/20 rounded-xl p-6 bg-navy-light space-y-4"
        >
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div>
            <label className="block text-sm text-gray-300 mb-1">Title</label>
            <input
              name="title"
              required
              className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="e.g. Period 2 Backtest: Mean Reversion Model"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Description (optional)
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="Describe what you built, any questions you have, or areas you want feedback on."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Related Content (optional)
            </label>
            <select
              name="related_content_id"
              className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm"
            >
              <option value="">None</option>
              {contentItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              File (.py, .ipynb, .zip, .pdf, .txt, .csv)
            </label>
            <input
              name="file"
              type="file"
              accept=".py,.ipynb,.zip,.pdf,.txt,.csv"
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gold/20 file:text-gold file:text-sm file:font-medium hover:file:bg-gold/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
