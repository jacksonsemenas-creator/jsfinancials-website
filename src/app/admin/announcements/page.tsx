import { requireAdmin } from "@/lib/portal";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import AnnouncementManager from "./AnnouncementManager";

export const metadata: Metadata = {
  title: "Announcements | Mentorship Portal",
};

export default async function AdminAnnouncementsPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Announcements
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Post announcements visible to all mentorship clients.
      </p>

      <AnnouncementManager announcements={announcements ?? []} />
    </div>
  );
}
