import { requireAdmin } from "@/lib/portal";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Overview | Mentorship Portal",
};

export default async function AdminOverviewPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: clients } = await supabase
    .from("profiles")
    .select("id, full_name, track, current_period, created_at")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  // Get progress and submission counts per client
  const clientIds = (clients ?? []).map((c) => c.id);

  const [{ data: progressData }, { data: accessData }, { data: submissionData }] =
    await Promise.all([
      supabase
        .from("progress_items")
        .select("client_id")
        .in("client_id", clientIds.length > 0 ? clientIds : [""]),
      supabase
        .from("client_access")
        .select("client_id")
        .in("client_id", clientIds.length > 0 ? clientIds : [""]),
      supabase
        .from("submissions")
        .select("client_id, created_at")
        .in("client_id", clientIds.length > 0 ? clientIds : [""])
        .order("created_at", { ascending: false }),
    ]);

  function countFor(data: { client_id: string }[] | null, id: string) {
    return (data ?? []).filter((r) => r.client_id === id).length;
  }

  function lastSubmission(id: string) {
    const sub = (submissionData ?? []).find((r) => r.client_id === id);
    return sub
      ? new Date(sub.created_at).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "short",
        })
      : "None";
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Admin Overview
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        All mentorship clients at a glance.
      </p>

      <div className="mt-8 overflow-x-auto">
        {clients && clients.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Track</th>
                <th className="text-center py-3 px-4">Period</th>
                <th className="text-center py-3 px-4">Progress</th>
                <th className="text-center py-3 px-4">Last Submission</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const completed = countFor(progressData, client.id);
                const total = countFor(accessData, client.id);
                const pct =
                  total > 0 ? Math.round((completed / total) * 100) : 0;
                return (
                  <tr
                    key={client.id}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="py-3 px-4 text-white font-medium">
                      {client.full_name ?? "Unnamed"}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {client.track?.replace(/_/g, " ") ?? "Not set"}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-300">
                      {client.current_period}/12
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-gray-300">{pct}%</span>
                      <span className="text-gray-600 text-xs ml-1">
                        ({completed}/{total})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-400">
                      {lastSubmission(client.id)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="border border-white/5 rounded-xl p-8 text-center bg-[#0d1a2e]">
            <p className="text-gray-500 text-sm">
              No clients yet. Use the Client Manager to invite your first
              mentorship client.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
