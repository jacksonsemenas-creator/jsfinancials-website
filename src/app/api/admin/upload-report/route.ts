import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUser, isAdmin } from "@/lib/entitlements";

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user || !(await isAdmin(user.id))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;

  if (!file || !title || !date) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const admin = createAdminClient();
  const filePath = `reports/${date}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

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

  const { error: dbError } = await admin
    .from("daily_reports")
    .upsert(
      { title, report_date: date, file_path: filePath },
      { onConflict: "report_date" },
    );

  if (dbError) {
    return Response.json({ error: dbError.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
