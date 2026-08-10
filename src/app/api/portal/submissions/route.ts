import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const title = form.get("title") as string;
  const description = (form.get("description") as string) || null;
  const relatedContentId = (form.get("related_content_id") as string) || null;
  const file = form.get("file") as File | null;

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  let storagePath: string | null = null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "txt";
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${user.id}/${Date.now()}-${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const admin = createAdminClient();
    const { error: uploadError } = await admin.storage
      .from("submissions")
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
      return Response.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }
    storagePath = path;
  }

  const { data, error } = await supabase.from("submissions").insert({
    client_id: user.id,
    title,
    description,
    related_content_id: relatedContentId || null,
    storage_path: storagePath,
  }).select("id").single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  // Stub: send email notification to admin
  // If RESEND_API_KEY is set, notify admin of new submission
  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "JS Financials <hello@jsfinancials.com.au>",
        to: "jsfinancialsaustralia@gmail.com",
        subject: `New Submission: ${title}`,
        html: `<p>A mentorship client has submitted new work: <strong>${title}</strong></p><p>${description || "No description provided."}</p>`,
      });
    }
  } catch {
    // Email notification is best-effort
  }

  return Response.json({ ok: true, id: data.id });
}
