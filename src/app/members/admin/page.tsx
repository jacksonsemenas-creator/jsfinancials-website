import { redirect } from "next/navigation";
import { getUser, isAdmin } from "@/lib/entitlements";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import AdminUpload from "./AdminUpload";

export const metadata: Metadata = {
  title: "Content Manager",
};

export default async function AdminPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const admin = await isAdmin(user.id);
  if (!admin) redirect("/members");

  const supabase = createAdminClient();

  const [reports, courses, research] = await Promise.all([
    supabase
      .from("daily_reports")
      .select("id, title, report_date, file_path")
      .order("report_date", { ascending: false }),
    supabase
      .from("course_materials")
      .select("id, course, title, module_number, description, file_path")
      .order("course")
      .order("module_number", { ascending: true, nullsFirst: false }),
    supabase
      .from("research_resources")
      .select("id, title, description, resource_type, file_path, video_url")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Content Manager
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Upload, manage, and delete reports, course materials, and research
        resources.
      </p>

      <AdminUpload
        existingReports={reports.data ?? []}
        existingCourses={courses.data ?? []}
        existingResearch={research.data ?? []}
      />
    </div>
  );
}
