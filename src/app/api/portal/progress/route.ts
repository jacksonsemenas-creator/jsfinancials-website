import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { contentId } = await request.json();
  if (!contentId) {
    return Response.json({ error: "Missing contentId" }, { status: 400 });
  }

  const { error } = await supabase.from("progress_items").insert({
    client_id: user.id,
    content_id: contentId,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { contentId } = await request.json();
  if (!contentId) {
    return Response.json({ error: "Missing contentId" }, { status: 400 });
  }

  await supabase
    .from("progress_items")
    .delete()
    .eq("client_id", user.id)
    .eq("content_id", contentId);

  return Response.json({ ok: true });
}
