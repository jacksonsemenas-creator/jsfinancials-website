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

  const { clientId, sessionDate, covered, assigned } = await request.json();
  if (!clientId || !sessionDate) {
    return Response.json(
      { error: "Client and date are required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.from("session_logs").insert({
    client_id: clientId,
    session_date: sessionDate,
    covered: covered || null,
    assigned: assigned || null,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}

export async function PATCH(request: Request) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });

  const { id, covered, assigned } = await request.json();
  if (!id) {
    return Response.json({ error: "Session ID required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("session_logs")
    .update({ covered, assigned })
    .eq("id", id);

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
  await admin.from("session_logs").delete().eq("id", id);

  return Response.json({ ok: true });
}
