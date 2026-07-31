"use client";

import { useState } from "react";

export default function CancelSubscription({
  periodEnd,
}: {
  periodEnd: string | null;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [cancelDate, setCancelDate] = useState(periodEnd);
  const [error, setError] = useState("");

  async function handleCancel() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/cancel-subscription", {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setCanceled(true);
      setCancelDate(data.current_period_end);
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
    setConfirming(false);
  }

  if (canceled) {
    return (
      <div className="border border-gold/20 rounded-lg px-5 py-4 bg-navy-light mt-6">
        <p className="text-gray-300 text-sm">
          Your subscription has been cancelled. You will retain access until{" "}
          <span className="text-white font-medium">
            {cancelDate
              ? new Date(cancelDate).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "the end of your billing period"}
          </span>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="text-sm text-gray-500 hover:text-red-400 transition-colors"
        >
          Cancel subscription
        </button>
      ) : (
        <div className="border border-red-700/30 rounded-lg px-5 py-4 bg-navy-light">
          <p className="text-gray-300 text-sm">
            Are you sure? You will keep access until the end of your current
            billing period.
          </p>

          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Cancelling..." : "Yes, cancel"}
            </button>
            <button
              onClick={() => {
                setConfirming(false);
                setError("");
              }}
              className="rounded-lg border border-gold/20 px-4 py-2 text-sm text-gray-300 hover:text-white hover:border-gold/40 transition-colors"
            >
              Keep subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
