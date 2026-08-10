import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SubmissionForm from "./SubmissionForm";

export const metadata: Metadata = {
  title: "Submissions | Mentorship",
};

const statusColors: Record<string, string> = {
  submitted: "bg-blue-500/20 text-blue-300",
  in_review: "bg-yellow-500/20 text-yellow-300",
  reviewed: "bg-green-500/20 text-green-300",
  revision_requested: "bg-red-500/20 text-red-300",
};

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  in_review: "In Review",
  reviewed: "Reviewed",
  revision_requested: "Revision Requested",
};

export default async function SubmissionsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: submissions } = await supabase
    .from("submissions")
    .select("id, title, status, created_at")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  const { data: contentItems } = await supabase
    .from("content_items")
    .select("id, title")
    .order("title");

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Submissions
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Submit your work for review. Upload code, notebooks, reports, or any
        deliverable from your mentorship tasks.
      </p>

      <SubmissionForm contentItems={contentItems ?? []} />

      <div className="mt-10">
        <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-4">
          Your Submissions
        </h2>

        {submissions && submissions.length > 0 ? (
          <div className="space-y-2">
            {submissions.map((sub) => (
              <Link
                key={sub.id}
                href={`/members/mentorship/submissions/${sub.id}`}
                className="flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3.5 bg-navy-light hover:border-gold/30 transition-colors group"
              >
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                    {sub.title}
                  </p>
                  <p className="text-gray-600 text-xs mt-0.5">
                    {new Date(sub.created_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    statusColors[sub.status] ?? ""
                  }`}
                >
                  {statusLabels[sub.status] ?? sub.status}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-gold/10 rounded-xl p-8 text-center bg-navy-light">
            <p className="text-gray-500 text-sm">
              No submissions yet. Use the form above to submit your first piece
              of work. This could be a backtest script, a Jupyter notebook, a
              strategy write-up, or any task deliverable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
