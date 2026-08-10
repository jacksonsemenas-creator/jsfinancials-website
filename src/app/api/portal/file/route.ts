import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const contentId = request.nextUrl.searchParams.get("contentId");
  if (!contentId) {
    return Response.json({ error: "Missing contentId" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify user has access to this content via RLS
  const { data: item } = await supabase
    .from("content_items")
    .select("storage_path")
    .eq("id", contentId)
    .single();

  if (!item || !item.storage_path) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // Generate signed URL via admin client
  const admin = createAdminClient();
  const { data: signed, error } = await admin.storage
    .from("content")
    .createSignedUrl(item.storage_path, 60);

  if (error || !signed) {
    return Response.json({ error: "Failed to generate URL" }, { status: 500 });
  }

  return Response.json({ url: signed.signedUrl });
}
