import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id: submissionId } = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only admin can change status
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { status } = await request.json();
  const valid = ["submitted", "in_review", "reviewed", "revision_requested"];
  if (!valid.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("submissions")
    .update({ status })
    .eq("id", submissionId);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}
