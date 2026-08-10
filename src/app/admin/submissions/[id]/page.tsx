import { requireAdmin } from "@/lib/portal";
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import AdminReviewPanel from "./AdminReviewPanel";

export default async function AdminSubmissionDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const profile = await requireAdmin();
  const supabase = createAdminClient();

  const { data: submission } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (!submission) notFound();

  // Get client name
  const { data: clientProfile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", submission.client_id)
    .single();

  // Get reviews with author info
  const { data: reviews } = await supabase
    .from("submission_reviews")
    .select("id, author_id, body, created_at")
    .eq("submission_id", id)
    .order("created_at", { ascending: true });

  const authorIds = [...new Set((reviews ?? []).map((r) => r.author_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .in("id", authorIds.length > 0 ? authorIds : [""]);

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id, p])
  );

  // Get file download URL if exists
  let fileUrl: string | null = null;
  if (submission.storage_path) {
    const { data: signed } = await supabase.storage
      .from("submissions")
      .createSignedUrl(submission.storage_path, 300);
    fileUrl = signed?.signedUrl ?? null;
  }

  return (
    <AdminReviewPanel
      submission={{
        ...submission,
        clientName: clientProfile?.full_name ?? "Unknown",
      }}
      reviews={(reviews ?? []).map((r) => ({
        ...r,
        authorName: profileMap.get(r.author_id)?.full_name ?? "Unknown",
        authorRole: profileMap.get(r.author_id)?.role ?? "client",
      }))}
      fileUrl={fileUrl}
      adminId={profile.id}
    />
  );
}
