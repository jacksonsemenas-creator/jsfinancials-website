import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function checkAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return profile?.role === "admin" ? user : null;
}

export async function POST(request: Request) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });

  const { clientId, contentId } = await request.json();
  const admin = createAdminClient();

  const { error } = await admin.from("client_access").insert({
    client_id: clientId,
    content_id: contentId,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });

  const { clientId, contentId } = await request.json();
  const admin = createAdminClient();

  await admin
    .from("client_access")
    .delete()
    .eq("client_id", clientId)
    .eq("content_id", contentId);

  return Response.json({ ok: true });
}
