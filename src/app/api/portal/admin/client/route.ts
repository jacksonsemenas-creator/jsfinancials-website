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

export async function PATCH(request: Request) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });

  const { clientId, track, currentPeriod } = await request.json();
  if (!clientId) {
    return Response.json({ error: "clientId required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const updates: Record<string, unknown> = {};
  if (track !== undefined) updates.track = track;
  if (currentPeriod !== undefined) updates.current_period = currentPeriod;

  const { error } = await admin
    .from("profiles")
    .update(updates)
    .eq("id", clientId);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}
