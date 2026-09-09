import { timingSafeEqual } from "crypto";

/**
 * Constant-time comparison of the bearer token against REPORTS_INGEST_TOKEN.
 * Returns true if the token is valid.
 */
export function verifyIngestToken(authHeader: string | null): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;

  const token = authHeader.slice(7);
  const expected = process.env.REPORTS_INGEST_TOKEN;

  if (!expected || expected.length === 0) return false;
  if (token.length !== expected.length) return false;

  try {
    return timingSafeEqual(
      Buffer.from(token, "utf8"),
      Buffer.from(expected, "utf8")
    );
  } catch {
    return false;
  }
}
