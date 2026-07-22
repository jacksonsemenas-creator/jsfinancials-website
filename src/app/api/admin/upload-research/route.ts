import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUser, isAdmin } from "@/lib/entitlements";

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user || !(await isAdmin(user.id))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const resourceType = formData.get("resourceType") as string;

  if (!title || !resourceType) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const admin = createAdminClient();

  let filePath: string | null = null;
  let videoUrl: string | null = null;

  if (resourceType === "pdf") {
    const file = formData.get("file") as File | null;
    if (!file) {
      return Response.json({ error: "File required for PDF" }, { status: 400 });
    }

    filePath = `research/${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await admin.storage
      .from("member-content")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return Response.json({ error: uploadError.message }, { status: 500 });
    }
  } else {
    videoUrl = formData.get("videoUrl") as string;
    if (!videoUrl) {
      return Response.json({ error: "Video URL required" }, { status: 400 });
    }
  }

  const { error: dbError } = await admin.from("research_resources").insert({
    title,
    description: description || null,
    resource_type: resourceType,
    file_path: filePath,
    video_url: videoUrl,
  });

  if (dbError) {
    return Response.json({ error: dbError.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
