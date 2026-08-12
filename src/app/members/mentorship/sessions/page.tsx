import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session Log | Mentorship",
};

export default async function SessionsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: sessions } = await supabase
    .from("session_logs")
    .select("id, session_date, covered, assigned")
    .eq("client_id", user.id)
    .order("session_date", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Session Log
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        A record of every mentorship call. What was covered, what was assigned,
        and what to prepare for next time.
      </p>

      <div className="mt-8">
        {sessions && sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="border border-gold/10 rounded-xl p-5 bg-navy-light"
              >
                <p className="text-gold text-xs uppercase tracking-widest mb-3">
                  {new Date(session.session_date + "T00:00:00").toLocaleDateString(
                    "en-AU",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>

                {session.covered && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                      Covered
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {session.covered}
                    </p>
                  </div>
                )}

                {session.assigned && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                      Assigned
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {session.assigned}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gold/10 rounded-xl p-8 text-center bg-navy-light">
            <p className="text-gray-500 text-sm">
              No session notes yet. After each call, Jackson will log what was
              covered and what to work on before the next session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
