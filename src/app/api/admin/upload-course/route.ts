import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUser, isAdmin } from "@/lib/entitlements";

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user || !(await isAdmin(user.id))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const course = formData.get("course") as string;
  const title = formData.get("title") as string;
  const moduleNumber = formData.get("moduleNumber") as string;
  const description = formData.get("description") as string;

  if (!file || !course || !title) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const admin = createAdminClient();
  const filePath = `courses/${course}/${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

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

  const { error: dbError } = await admin.from("course_materials").insert({
    course,
    title,
    module_number: moduleNumber ? parseInt(moduleNumber, 10) : null,
    description: description || null,
    file_path: filePath,
  });

  if (dbError) {
    return Response.json({ error: dbError.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
