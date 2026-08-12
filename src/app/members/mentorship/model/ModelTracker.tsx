"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STAGES = [
  { key: "idea", label: "Idea" },
  { key: "design", label: "Design" },
  { key: "validation", label: "Validation" },
  { key: "backtest", label: "Backtest" },
  { key: "live_plan", label: "Live Plan" },
];

interface Project {
  id: string;
  title: string;
  stage: string;
  notes: string | null;
  updated_at: string;
}

export default function ModelTracker({ project }: { project: Project }) {
  const router = useRouter();
  const [notes, setNotes] = useState(project.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentIndex = STAGES.findIndex((s) => s.key === project.stage);

  async function handleSaveNotes() {
    setSaving(true);
    setSaved(false);

    await fetch("/api/portal/model", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: project.id, notes }),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="border border-gold/20 rounded-xl p-6 bg-navy-light">
      <h2 className="text-white font-heading font-semibold text-lg mb-1">
        {project.title}
      </h2>
      <p className="text-gray-600 text-xs mb-6">
        Last updated{" "}
        {new Date(project.updated_at).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Stage stepper */}
      <div className="flex items-center gap-1 mb-8">
        {STAGES.map((stage, i) => {
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={stage.key} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-center">
                {i > 0 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      isComplete ? "bg-gold" : "bg-white/10"
                    }`}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                    isComplete
                      ? "bg-gold text-navy"
                      : isCurrent
                        ? "bg-gold/20 text-gold border-2 border-gold"
                        : "bg-white/5 text-gray-600 border border-white/10"
                  }`}
                >
                  {isComplete ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < STAGES.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      isComplete ? "bg-gold" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
              <p
                className={`text-xs mt-2 text-center ${
                  isCurrent
                    ? "text-gold font-medium"
                    : isComplete
                      ? "text-gray-400"
                      : "text-gray-600"
                }`}
              >
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Current stage label */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
          Current Stage
        </p>
        <p className="text-gold font-heading font-semibold">
          {STAGES[currentIndex]?.label ?? project.stage}
        </p>
      </div>

      {/* Notes */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
          Your Notes
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Write notes about your model: hypotheses, design decisions, things to test, open questions..."
          className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
        />
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleSaveNotes}
            disabled={saving}
            className="px-4 py-1.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Notes"}
          </button>
          {saved && (
            <span className="text-gold text-xs">Saved</span>
          )}
        </div>
      </div>
    </div>
  );
}
