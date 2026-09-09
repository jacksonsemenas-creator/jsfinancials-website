import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyIngestToken } from "@/lib/reports-auth";

export const runtime = "nodejs";

const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10 MB
const VALID_EDITIONS = ["daily", "weekend", "holiday"];

// Simple in-memory rate limiter: max 30 requests per minute
const rateMap = new Map<string, { count: number; resetAt: number }>();
function checkRate(key: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  entry.count++;
  return entry.count <= 30;
}

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRate(ip)) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // Auth: bearer token only
  if (!verifyIngestToken(request.headers.get("authorization"))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse multipart form
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json(
      { error: "Expected multipart/form-data" },
      { status: 400 }
    );
  }

  const pdf = form.get("pdf") as File | null;
  const date = form.get("date") as string | null;
  const dayNumber = form.get("dayNumber") as string | null;
  const title = form.get("title") as string | null;
  const edition = (form.get("edition") as string | null) ?? "daily";
  const emailBlurb = (form.get("emailBlurb") as string | null) ?? null;

  // Validate required fields
  if (!pdf || !date || !title) {
    return Response.json(
      { error: "Missing required fields: pdf, date, title" },
      { status: 400 }
    );
  }

  // Validate date parses
  const parsedDate = new Date(date + "T00:00:00Z");
  if (isNaN(parsedDate.getTime())) {
    return Response.json({ error: "Invalid date format" }, { status: 400 });
  }

  // Validate edition
  if (!VALID_EDITIONS.includes(edition)) {
    return Response.json(
      { error: `Invalid edition. Must be one of: ${VALID_EDITIONS.join(", ")}` },
      { status: 400 }
    );
  }

  // Validate PDF
  if (pdf.type !== "application/pdf") {
    return Response.json(
      { error: "File must be application/pdf" },
      { status: 400 }
    );
  }
  if (pdf.size > MAX_PDF_SIZE) {
    return Response.json(
      { error: `PDF exceeds ${MAX_PDF_SIZE / 1024 / 1024}MB limit` },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  // Upload PDF to storage
  const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const filePath = `reports/${date}-${safeName}.pdf`;
  const buffer = Buffer.from(await pdf.arrayBuffer());

  const { error: uploadError } = await admin.storage
    .from("member-content")
    .upload(filePath, buffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    return Response.json(
      { error: `Storage upload failed: ${uploadError.message}` },
      { status: 500 }
    );
  }

  // Upsert report record (idempotent on date)
  const { data: report, error: dbError } = await admin
    .from("daily_reports")
    .upsert(
      {
        title,
        report_date: date,
        file_path: filePath,
        day_number: dayNumber ? parseInt(dayNumber, 10) : null,
        edition,
        status: "draft",
        email_blurb: emailBlurb,
      },
      { onConflict: "report_date" }
    )
    .select("id, report_date, status")
    .single();

  if (dbError) {
    return Response.json(
      { error: `Database error: ${dbError.message}` },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jsfinancials.com.au";

  return Response.json({
    id: report.id,
    date: report.report_date,
    status: report.status,
    adminUrl: `${siteUrl}/members/admin`,
  });
}
