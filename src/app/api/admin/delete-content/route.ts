import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUser, isAdmin } from "@/lib/entitlements";

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user || !(await isAdmin(user.id))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { table, id, filePath } = await request.json();

  const allowedTables = ["daily_reports", "course_materials", "research_resources"];
  if (!allowedTables.includes(table) || !id) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Delete from storage if there's a file
  if (filePath) {
    const { error: storageError } = await admin.storage
      .from("member-content")
      .remove([filePath]);

    if (storageError) {
      console.error("Storage delete error:", storageError.message);
    }
  }

  // Delete from database
  const { error: dbError } = await admin
    .from(table)
    .delete()
    .eq("id", id);

  if (dbError) {
    return Response.json({ error: dbError.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
