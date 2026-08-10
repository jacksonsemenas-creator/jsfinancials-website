"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  full_name: string | null;
  track: string | null;
  current_period: number;
}

interface ContentItem {
  id: string;
  title: string;
  type: string;
  period: number | null;
  sort_order: number;
}

interface AccessRow {
  client_id: string;
  content_id: string;
}

export default function ClientManager({
  clients,
  contentItems,
  accessRows,
}: {
  clients: Client[];
  contentItems: ContentItem[];
  accessRows: AccessRow[];
}) {
  const router = useRouter();
  const [showInvite, setShowInvite] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [accessSet, setAccessSet] = useState(
    new Set(accessRows.map((r) => `${r.client_id}:${r.content_id}`))
  );

  async function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInviteLoading(true);
    setInviteError("");

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/portal/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        fullName: form.get("fullName"),
        track: form.get("track") || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setInviteError(data.error || "Failed to invite");
      setInviteLoading(false);
      return;
    }

    setShowInvite(false);
    setInviteLoading(false);
    router.refresh();
  }

  async function handleUpdateClient(
    clientId: string,
    field: string,
    value: string | number
  ) {
    await fetch("/api/portal/admin/client", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        [field]: value,
      }),
    });
    router.refresh();
  }

  async function toggleAccess(clientId: string, contentId: string) {
    const key = `${clientId}:${contentId}`;
    const has = accessSet.has(key);

    const res = await fetch("/api/portal/admin/access", {
      method: has ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, contentId }),
    });

    if (res.ok) {
      const next = new Set(accessSet);
      if (has) next.delete(key);
      else next.add(key);
      setAccessSet(next);
    }
  }

  const selected = clients.find((c) => c.id === selectedClient);

  return (
    <div className="mt-8">
      {/* Invite button */}
      <button
        onClick={() => setShowInvite(!showInvite)}
        className="inline-flex items-center px-4 py-2 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors"
      >
        {showInvite ? "Cancel" : "Invite Client"}
      </button>

      {showInvite && (
        <form
          onSubmit={handleInvite}
          className="mt-4 border border-[#C9A84C]/20 rounded-xl p-6 bg-[#0d1a2e] space-y-4"
        >
          {inviteError && (
            <p className="text-red-400 text-sm">{inviteError}</p>
          )}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Full Name
              </label>
              <input
                name="fullName"
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Track</label>
              <select
                name="track"
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              >
                <option value="">Not set</option>
                <option value="beginner">Beginner</option>
                <option value="discretionary_conversion">
                  Discretionary Conversion
                </option>
                <option value="systematic">Systematic</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={inviteLoading}
            className="px-5 py-2 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-lg disabled:opacity-50"
          >
            {inviteLoading ? "Inviting..." : "Send Invite"}
          </button>
        </form>
      )}

      {/* Client list */}
      <div className="mt-8 space-y-2">
        {clients.map((client) => (
          <button
            key={client.id}
            onClick={() =>
              setSelectedClient(
                selectedClient === client.id ? null : client.id
              )
            }
            className={`w-full text-left flex items-center justify-between border rounded-lg px-4 py-3 transition-colors ${
              selectedClient === client.id
                ? "border-[#C9A84C]/40 bg-[#0d1a2e]"
                : "border-white/5 bg-[#0d1a2e] hover:border-white/10"
            }`}
          >
            <div>
              <p className="text-white text-sm font-medium">
                {client.full_name ?? "Unnamed"}
              </p>
              <p className="text-gray-600 text-xs">
                Period {client.current_period}/12
                {client.track ? ` | ${client.track.replace(/_/g, " ")}` : ""}
              </p>
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                selectedClient === client.id ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        ))}
      </div>

      {/* Selected client detail */}
      {selected && (
        <div className="mt-4 border border-[#C9A84C]/20 rounded-xl p-6 bg-[#0d1a2e]">
          <h3 className="text-white font-heading font-semibold mb-4">
            {selected.full_name ?? "Unnamed"}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Track</label>
              <select
                value={selected.track ?? ""}
                onChange={(e) =>
                  handleUpdateClient(selected.id, "track", e.target.value)
                }
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              >
                <option value="">Not set</option>
                <option value="beginner">Beginner</option>
                <option value="discretionary_conversion">
                  Discretionary Conversion
                </option>
                <option value="systematic">Systematic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Current Period
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={selected.current_period}
                onChange={(e) =>
                  handleUpdateClient(
                    selected.id,
                    "currentPeriod",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-white text-sm"
              />
            </div>
          </div>

          {/* Content access matrix */}
          <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-3">
            Content Access
          </h4>
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {contentItems.map((item) => {
              const key = `${selected.id}:${item.id}`;
              const has = accessSet.has(key);
              return (
                <label
                  key={item.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.02] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={has}
                    onChange={() => toggleAccess(selected.id, item.id)}
                    className="rounded border-white/20 bg-[#0A1628] text-[#C9A84C] focus:ring-[#C9A84C]"
                  />
                  <div>
                    <p className="text-white text-sm">{item.title}</p>
                    <p className="text-gray-600 text-xs">
                      {item.type.replace(/_/g, " ")}
                      {item.period ? ` | Period ${item.period}` : ""}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
