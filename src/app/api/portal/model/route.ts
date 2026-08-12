import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId, notes } = await request.json();
  if (!projectId) {
    return Response.json({ error: "projectId required" }, { status: 400 });
  }

  // Client can only update notes on their own project (RLS enforces ownership)
  const { error } = await supabase
    .from("model_projects")
    .update({ notes, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("client_id", user.id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}
