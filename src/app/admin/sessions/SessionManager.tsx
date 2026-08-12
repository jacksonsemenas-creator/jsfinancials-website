"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  full_name: string | null;
}

interface Session {
  id: string;
  client_id: string;
  session_date: string;
  covered: string | null;
  assigned: string | null;
  clientName: string;
}

export default function SessionManager({
  clients,
  sessions,
}: {
  clients: Client[];
  sessions: Session[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterClient, setFilterClient] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    await fetch("/api/portal/admin/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: form.get("clientId"),
        sessionDate: form.get("sessionDate"),
        covered: form.get("covered") || null,
        assigned: form.get("assigned") || null,
      }),
    });

    setShowForm(false);
    setLoading(false);
    router.refresh();
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    await fetch("/api/portal/admin/sessions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        covered: form.get("covered") || null,
        assigned: form.get("assigned") || null,
      }),
    });

    setEditingId(null);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this session log?")) return;
    await fetch("/api/portal/admin/sessions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  const filtered = filterClient
    ? sessions.filter((s) => s.client_id === filterClient)
    : sessions;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
          className="inline-flex items-center px-4 py-2 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
        >
          {showForm ? "Cancel" : "Log Session"}
        </button>

        <select
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className="rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm"
        >
          <option value="">All Clients</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.full_name ?? "Unnamed"}
            </option>
          ))}
        </select>
      </div>

      {/* New session form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 border border-gold/20 rounded-xl p-6 bg-navy-light space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Client</label>
              <select
                name="clientId"
                required
                className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm"
              >
                <option value="">Select client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name ?? "Unnamed"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Date</label>
              <input
                name="sessionDate"
                type="date"
                required
                className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              What was covered
            </label>
            <textarea
              name="covered"
              rows={3}
              className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm"
              placeholder="Topics discussed, concepts reviewed, progress made..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              What was assigned
            </label>
            <textarea
              name="assigned"
              rows={3}
              className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm"
              placeholder="Tasks to complete before next session..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-gold text-navy text-sm font-semibold rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Session"}
          </button>
        </form>
      )}

      {/* Session list */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((session) => (
            <div
              key={session.id}
              className="border border-gold/10 rounded-xl p-5 bg-navy-light"
            >
              {editingId === session.id ? (
                <form onSubmit={handleUpdate} className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Covered</label>
                    <textarea
                      name="covered"
                      rows={3}
                      defaultValue={session.covered ?? ""}
                      className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Assigned</label>
                    <textarea
                      name="assigned"
                      rows={3}
                      defaultValue={session.assigned ?? ""}
                      className="w-full rounded-lg border border-gold/20 bg-navy px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-1.5 bg-gold text-navy text-sm font-semibold rounded-lg disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-4 py-1.5 border border-gold/20 text-gray-300 text-sm rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-gold text-xs uppercase tracking-widest">
                        {new Date(
                          session.session_date + "T00:00:00"
                        ).toLocaleDateString("en-AU", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-gray-600 text-xs ml-3">
                        {session.clientName}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingId(session.id)}
                        className="text-gray-500 hover:text-white text-xs transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(session.id)}
                        className="text-gray-600 hover:text-red-400 text-xs transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {session.covered && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                        Covered
                      </p>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">
                        {session.covered}
                      </p>
                    </div>
                  )}

                  {session.assigned && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                        Assigned
                      </p>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">
                        {session.assigned}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gold/10 rounded-xl p-8 text-center bg-navy-light">
          <p className="text-gray-500 text-sm">
            No session logs yet. Use the form above to log your first call.
          </p>
        </div>
      )}
    </div>
  );
}
