import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const submissionId = request.nextUrl.searchParams.get("submissionId");
  if (!submissionId) {
    return Response.json({ error: "Missing submissionId" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin or owns the submission
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const { data: submission } = await supabase
    .from("submissions")
    .select("storage_path, client_id")
    .eq("id", submissionId)
    .single();

  if (!submission?.storage_path) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  if (profile?.role !== "admin" && submission.client_id !== user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = createAdminClient();
  const { data: signed, error } = await admin.storage
    .from("submissions")
    .createSignedUrl(submission.storage_path, 60);

  if (error || !signed) {
    return Response.json({ error: "Failed to generate URL" }, { status: 500 });
  }

  return Response.json({ url: signed.signedUrl });
}
