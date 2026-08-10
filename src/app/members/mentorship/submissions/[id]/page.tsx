import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import ReviewThread from "./ReviewThread";

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

export default async function SubmissionDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: submission } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (!submission) notFound();

  const { data: reviews } = await supabase
    .from("submission_reviews")
    .select("id, author_id, body, created_at")
    .eq("submission_id", id)
    .order("created_at", { ascending: true });

  // Get author names for reviews
  const authorIds = [...new Set((reviews ?? []).map((r) => r.author_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .in("id", authorIds.length > 0 ? authorIds : [""]);

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id, p])
  );

  return (
    <div>
      <div className="mb-6">
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

        {submission.storage_path && (
          <a
            href={`/api/portal/submission-file?submissionId=${submission.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gold/10 text-gold text-sm font-medium rounded-lg hover:bg-gold/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Submitted File
          </a>
        )}
      </div>

      <ReviewThread
        submissionId={submission.id}
        reviews={(reviews ?? []).map((r) => ({
          ...r,
          authorName: profileMap.get(r.author_id)?.full_name ?? "Unknown",
          authorRole: profileMap.get(r.author_id)?.role ?? "client",
        }))}
        currentUserId={user.id}
      />
    </div>
  );
}
