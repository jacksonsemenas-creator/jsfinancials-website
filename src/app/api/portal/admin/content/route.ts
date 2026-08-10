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

  const form = await request.formData();
  const type = form.get("type") as string;
  const title = form.get("title") as string;
  const description = (form.get("description") as string) || null;
  const period = form.get("period") ? Number(form.get("period")) : null;
  const topicSlug = (form.get("topic_slug") as string) || null;
  const videoUrl = (form.get("video_url") as string) || null;
  const sortOrder = Number(form.get("sort_order") || 0);
  const file = form.get("file") as File | null;

  let storagePath: string | null = null;

  if (file && file.size > 0) {
    const admin = createAdminClient();
    const ext = file.name.split(".").pop() ?? "pdf";
    const path = `${type}/${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await admin.storage
      .from("content")
      .upload(path, buffer, { contentType: file.type, upsert: true });

    if (uploadError) {
      return Response.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }
    storagePath = path;
  }

  const admin = createAdminClient();
  const { error } = await admin.from("content_items").insert({
    type,
    title,
    description,
    period,
    topic_slug: topicSlug,
    storage_path: storagePath,
    video_url: videoUrl,
    sort_order: sortOrder,
  });

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

  // Delete the file from storage if it exists
  const { data: item } = await admin
    .from("content_items")
    .select("storage_path")
    .eq("id", id)
    .single();

  if (item?.storage_path) {
    await admin.storage.from("content").remove([item.storage_path]);
  }

  await admin.from("content_items").delete().eq("id", id);

  return Response.json({ ok: true });
}
