import { requireAdmin } from "@/lib/portal";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import ClientManager from "./ClientManager";

export const metadata: Metadata = {
  title: "Client Manager | Mentorship Portal",
};

export default async function AdminClientsPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const [{ data: clients }, { data: contentItems }, { data: accessRows }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id, full_name, track, current_period")
        .eq("role", "client")
        .order("full_name"),
      supabase
        .from("content_items")
        .select("id, title, type, period, sort_order")
        .order("type")
        .order("sort_order"),
      supabase.from("client_access").select("client_id, content_id"),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Client Manager
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Invite clients, set their track and period, and control content access.
      </p>

      <ClientManager
        clients={clients ?? []}
        contentItems={contentItems ?? []}
        accessRows={accessRows ?? []}
      />
    </div>
  );
}
