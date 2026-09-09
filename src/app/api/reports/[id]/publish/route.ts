import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { verifyIngestToken } from "@/lib/reports-auth";
import { EMAIL_FOOTER_HTML } from "@/lib/email-footer";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  // Auth: accept bearer token OR authenticated admin session
  const bearerValid = verifyIngestToken(
    request.headers.get("authorization")
  );

  let isAdminSession = false;
  if (!bearerValid) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: adminRow } = await supabase
          .from("admins")
          .select("id")
          .eq("user_id", user.id)
          .limit(1)
          .single();
        isAdminSession = !!adminRow;
      }
    } catch {
      // Session check failed, not admin
    }
  }

  if (!bearerValid && !isAdminSession) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Fetch the report
  const { data: report, error: fetchError } = await admin
    .from("daily_reports")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !report) {
    return Response.json({ error: "Report not found" }, { status: 404 });
  }

  // Guard against double-publish (no duplicate email)
  if (report.status === "published") {
    return Response.json({
      id: report.id,
      status: "published",
      publishedAt: report.published_at,
      message: "Already published. No email resent.",
    });
  }

  // Publish: update status and timestamp
  const publishedAt = new Date().toISOString();
  const { error: updateError } = await admin
    .from("daily_reports")
    .update({ status: "published", published_at: publishedAt })
    .eq("id", id);

  if (updateError) {
    return Response.json(
      { error: `Failed to publish: ${updateError.message}` },
      { status: 500 }
    );
  }

  // Send email to all entitled daily_report subscribers
  let emailResult = "skipped";
  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Get all users with active daily_report entitlement
      const { data: entitlements } = await admin
        .from("entitlements")
        .select("user_id")
        .eq("product", "daily_report")
        .eq("status", "active");

      if (entitlements && entitlements.length > 0) {
        // Get emails for these users
        const userIds = entitlements.map((e) => e.user_id);
        const emails: string[] = [];

        // Batch lookup users (Supabase admin API)
        for (const userId of userIds) {
          const { data: userData } =
            await admin.auth.admin.getUserById(userId);
          if (userData?.user?.email) {
            emails.push(userData.user.email);
          }
        }

        if (emails.length > 0) {
          const siteUrl =
            process.env.NEXT_PUBLIC_SITE_URL ||
            "https://jsfinancials.com.au";
          const portalLink = `${siteUrl}/members/reports`;
          const blurb = report.email_blurb
            ? `<p style="color: #333; font-size: 16px; line-height: 1.6;">${report.email_blurb}</p>`
            : "";

          // Download the PDF for attachment
          let attachments: { filename: string; content: Buffer }[] = [];
          try {
            const { data: pdfData } = await admin.storage
              .from("member-content")
              .download(report.file_path);
            if (pdfData) {
              const pdfBuffer = Buffer.from(await pdfData.arrayBuffer());
              attachments = [
                {
                  filename: `${report.title.replace(/[^a-zA-Z0-9 ._-]/g, "")}.pdf`,
                  content: pdfBuffer,
                },
              ];
            }
          } catch {
            // If PDF download fails, send without attachment
          }

          const fromEmail =
            process.env.RESEND_FROM_EMAIL ||
            "JS Financials <hello@jsfinancials.com.au>";

          // Send in batches of 50 (Resend batch limit)
          for (let i = 0; i < emails.length; i += 50) {
            const batch = emails.slice(i, i + 50);
            const sends = batch.map((to) =>
              resend.emails.send({
                from: fromEmail,
                to,
                subject: report.title,
                html: `
                  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                    <div style="background: #121f37; padding: 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; font-size: 24px; margin: 0;">JS Financials</h1>
                      <p style="color: #a48420; font-size: 14px; margin-top: 8px;">Daily Macroeconomic Report</p>
                    </div>
                    <div style="padding: 30px;">
                      <p style="color: #333; font-size: 16px; line-height: 1.6;"><strong>${report.title}</strong></p>
                      ${blurb}
                      <p style="color: #333; font-size: 16px; line-height: 1.6;">
                        Your daily report is attached. You can also view it and your full archive in the
                        <a href="${portalLink}" style="color: #a48420; font-weight: bold;">member portal</a>.
                      </p>
                      ${EMAIL_FOOTER_HTML}
                    </div>
                  </div>
                `,
                attachments,
              })
            );
            await Promise.allSettled(sends);
          }

          emailResult = `sent to ${emails.length} subscribers`;
        } else {
          emailResult = "no subscribers found";
        }
      } else {
        emailResult = "no active entitlements";
      }
    } else {
      emailResult = "RESEND_API_KEY not configured";
    }
  } catch (err) {
    // Email failure should not roll back publish
    emailResult = `email error: ${err instanceof Error ? err.message : "unknown"}`;
    console.error("Publish email error:", err);
  }

  return Response.json({
    id: report.id,
    status: "published",
    publishedAt,
    email: emailResult,
  });
}
