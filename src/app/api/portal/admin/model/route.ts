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

  const { clientId, title } = await request.json();
  if (!clientId || !title) {
    return Response.json(
      { error: "clientId and title required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.from("model_projects").insert({
    client_id: clientId,
    title,
    stage: "idea",
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}

export async function PATCH(request: Request) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Forbidden" }, { status: 403 });

  const { projectId, stage } = await request.json();
  if (!projectId || !stage) {
    return Response.json(
      { error: "projectId and stage required" },
      { status: 400 }
    );
  }

  const valid = ["idea", "design", "validation", "backtest", "live_plan"];
  if (!valid.includes(stage)) {
    return Response.json({ error: "Invalid stage" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("model_projects")
    .update({ stage, updated_at: new Date().toISOString() })
    .eq("id", projectId);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}
