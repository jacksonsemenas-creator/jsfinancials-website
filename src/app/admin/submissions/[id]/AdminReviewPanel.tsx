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

interface Submission {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  clientName: string;
  storage_path: string | null;
}

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  in_review: "In Review",
  reviewed: "Reviewed",
  revision_requested: "Revision Requested",
};

const statusColors: Record<string, string> = {
  submitted: "bg-blue-500/20 text-blue-300",
  in_review: "bg-yellow-500/20 text-yellow-300",
  reviewed: "bg-green-500/20 text-green-300",
  revision_requested: "bg-red-500/20 text-red-300",
};

export default function AdminReviewPanel({
  submission,
  reviews,
  fileUrl,
  adminId,
}: {
  submission: Submission;
  reviews: Review[];
  fileUrl: string | null;
  adminId: string;
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(submission.status);

  async function handleReview(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true);

    await fetch(`/api/portal/submissions/${submission.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: body.trim() }),
    });

    setBody("");
    setLoading(false);
    router.refresh();
  }

  async function handleStatusChange(newStatus: string) {
    setStatusLoading(true);
    setSelectedStatus(newStatus);

    await fetch(`/api/portal/submissions/${submission.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setStatusLoading(false);
    router.refresh();
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-gray-500 text-xs mb-1">
          {submission.clientName}
        </p>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
            {submission.title}
          </h1>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              statusColors[submission.status] ?? ""
            }`}
          >
            {statusLabels[submission.status] ?? submission.status}
          </span>
        </div>
        {submission.description && (
          <p className="text-gray-400 text-sm leading-relaxed">
            {submission.description}
          </p>
        )}
        <p className="text-gray-600 text-xs mt-2">
          Submitted{" "}
          {new Date(submission.created_at).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gold/10 text-gold text-sm font-medium rounded-lg hover:bg-gold/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download File
          </a>
        )}
      </div>

      {/* Status changer */}
      <div className="flex items-center gap-3 mb-8 p-4 border border-gold/20 rounded-xl bg-navy-light">
        <label className="text-sm text-gray-300">Set status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={statusLoading}
          className="rounded-lg border border-gold/20 bg-navy px-3 py-1.5 text-white text-sm"
        >
          <option value="submitted">Submitted</option>
          <option value="in_review">In Review</option>
          <option value="reviewed">Reviewed</option>
          <option value="revision_requested">Revision Requested</option>
        </select>
        {statusLoading && (
          <span className="text-gray-500 text-xs">Updating...</span>
        )}
      </div>

      {/* Review thread */}
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
            No reviews yet. Write your feedback below.
          </p>
        </div>
      )}

      {/* Review composer */}
      <form onSubmit={handleReview} className="space-y-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          placeholder="Write your review feedback..."
          className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
        />
        <button
          type="submit"
          disabled={loading || !body.trim()}
          className="px-5 py-2 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Post Review"}
        </button>
      </form>
    </div>
  );
}
