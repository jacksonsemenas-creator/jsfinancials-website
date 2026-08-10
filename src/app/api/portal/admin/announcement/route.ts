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

  const { title, body } = await request.json();
  const admin = createAdminClient();

  const { error } = await admin.from("announcements").insert({ title, body });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await request.json();
  const admin = createAdminClient();

  await admin.from("announcements").delete().eq("id", id);

  return Response.json({ ok: true });
}
