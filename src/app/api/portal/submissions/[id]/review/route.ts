import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id: submissionId } = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { body } = await request.json();
  if (!body?.trim()) {
    return Response.json({ error: "Review body is required" }, { status: 400 });
  }

  // RLS handles permission: admin can always insert, clients can only insert
  // on their own submissions (via the RLS policy)
  const { error } = await supabase.from("submission_reviews").insert({
    submission_id: submissionId,
    author_id: user.id,
    body: body.trim(),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  // Notify client if admin posted the review
  try {
    if (process.env.RESEND_API_KEY) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") {
        // Get the client email
        const { data: submission } = await supabase
          .from("submissions")
          .select("client_id, title")
          .eq("id", submissionId)
          .single();

        if (submission) {
          const { createAdminClient } = await import("@/lib/supabase/admin");
          const admin = createAdminClient();
          const { data: clientUser } = await admin.auth.admin.getUserById(
            submission.client_id
          );

          if (clientUser?.user?.email) {
            const { Resend } = await import("resend");
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
              from:
                process.env.RESEND_FROM_EMAIL ||
                "JS Financials <hello@jsfinancials.com.au>",
              to: clientUser.user.email,
              subject: `Review on: ${submission.title}`,
              html: `<p>Jackson has reviewed your submission: <strong>${submission.title}</strong></p><p>Log in to your mentorship dashboard to view the feedback.</p><div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;"><p style="color: #aaa; font-size: 11px;">JS Financials | ABN 57 226 575 365 | Canberra, Australia</p><p style="color: #aaa; font-size: 11px; margin-top: 6px;">This is a transactional email related to your JS Financials mentorship. If you believe you received this in error, contact <a href="mailto:hello@jsfinancials.com.au" style="color: #a48420;">hello@jsfinancials.com.au</a>.</p></div>`,
            });
          }
        }
      }
    }
  } catch {
    // Email notification is best-effort
  }

  return Response.json({ ok: true });
}
