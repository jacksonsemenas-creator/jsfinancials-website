"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  author_id: string;
  body: string;
  created_at: string;
  authorName: string;
  authorRole: string;
}

export default function ReviewThread({
  submissionId,
  reviews,
  currentUserId,
}: {
  submissionId: string;
  reviews: Review[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true);

    const res = await fetch(
      `/api/portal/submissions/${submissionId}/review`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: body.trim() }),
      }
    );

    if (res.ok) {
      setBody("");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-4">
        Review Thread
      </h2>

      {reviews.length > 0 ? (
        <div className="space-y-4 mb-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`border rounded-xl p-4 ${
                review.authorRole === "admin"
                  ? "border-gold/20 bg-gold/5"
                  : "border-white/10 bg-navy-light"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white text-sm font-medium">
                  {review.authorName}
                </span>
                {review.authorRole === "admin" && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gold/20 text-gold">
                    Mentor
                  </span>
                )}
                <span className="text-gray-600 text-xs">
                  {new Date(review.created_at).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {review.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-white/5 rounded-xl p-6 text-center bg-navy-light mb-6">
          <p className="text-gray-500 text-sm">
            No reviews yet. Jackson will review your submission and post
            feedback here.
          </p>
        </div>
      )}

      {/* Reply form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Write a reply..."
          className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
        />
        <button
          type="submit"
          disabled={loading || !body.trim()}
          className="px-5 py-2 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Reply"}
        </button>
      </form>
    </div>
  );
}
