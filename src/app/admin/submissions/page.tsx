import { requireAdmin } from "@/lib/portal";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submissions Queue | Admin",
};

const statusColors: Record<string, string> = {
  submitted: "bg-blue-500/20 text-blue-300",
  in_review: "bg-yellow-500/20 text-yellow-300",
  reviewed: "bg-green-500/20 text-green-300",
  revision_requested: "bg-red-500/20 text-red-300",
};

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  in_review: "In Review",
  reviewed: "Reviewed",
  revision_requested: "Revision Requested",
};

const statusOrder = ["submitted", "in_review", "revision_requested", "reviewed"];

export default async function AdminSubmissionsPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: submissions } = await supabase
    .from("submissions")
    .select("id, client_id, title, status, created_at")
    .order("created_at", { ascending: false });

  // Get client names
  const clientIds = [
    ...new Set((submissions ?? []).map((s) => s.client_id)),
  ];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", clientIds.length > 0 ? clientIds : [""]);

  const nameMap = new Map(
    (profiles ?? []).map((p) => [p.id, p.full_name ?? "Unnamed"])
  );

  // Sort by status priority then date
  const sorted = (submissions ?? []).sort((a, b) => {
    const sa = statusOrder.indexOf(a.status);
    const sb = statusOrder.indexOf(b.status);
    if (sa !== sb) return sa - sb;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Submissions Queue
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Review client submissions. Newest unreviewed submissions appear first.
      </p>

      <div className="mt-8">
        {sorted.length > 0 ? (
          <div className="space-y-2">
            {sorted.map((sub) => (
              <Link
                key={sub.id}
                href={`/admin/submissions/${sub.id}`}
                className="flex items-center justify-between border border-gold/10 rounded-lg px-5 py-3.5 bg-navy-light hover:border-gold/30 transition-colors group"
              >
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                    {sub.title}
                  </p>
                  <p className="text-gray-600 text-xs mt-0.5">
                    {nameMap.get(sub.client_id) ?? "Unknown"} &middot;{" "}
                    {new Date(sub.created_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    statusColors[sub.status] ?? ""
                  }`}
                >
                  {statusLabels[sub.status] ?? sub.status}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-gold/10 rounded-xl p-8 text-center bg-navy-light">
            <p className="text-gray-500 text-sm">
              No submissions yet. Clients will appear here when they submit
              work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
