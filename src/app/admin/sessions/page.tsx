import { requireAdmin } from "@/lib/portal";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import SessionManager from "./SessionManager";

export const metadata: Metadata = {
  title: "Session Logs | Admin",
};

export default async function AdminSessionsPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const [{ data: clients }, { data: sessions }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name")
      .eq("role", "client")
      .order("full_name"),
    supabase
      .from("session_logs")
      .select("id, client_id, session_date, covered, assigned")
      .order("session_date", { ascending: false }),
  ]);

  const nameMap = Object.fromEntries(
    (clients ?? []).map((c) => [c.id, c.full_name ?? "Unnamed"])
  );

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Session Logs
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Log call notes for each client. Clients see these as a read-only record.
      </p>

      <SessionManager
        clients={clients ?? []}
        sessions={(sessions ?? []).map((s) => ({
          ...s,
          clientName: nameMap[s.client_id] ?? "Unknown",
        }))}
      />
    </div>
  );
}
