import { NextRequest } from "next/server";
import { getUser, hasEntitlement } from "@/lib/entitlements";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Product } from "@/lib/entitlements";

const PATH_ENTITLEMENTS: Record<string, Product[]> = {
  reports: ["daily_report"],
  "courses/macro_course": ["macro_course"],
  "courses/prediction_markets": ["prediction_markets"],
};

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> },
) {
  const user = await getUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path } = await props.params;
  const filePath = path.join("/");

  // Check entitlement based on file path prefix
  for (const [prefix, products] of Object.entries(PATH_ENTITLEMENTS)) {
    if (filePath.startsWith(prefix)) {
      const hasAccess = await hasEntitlement(user.id, products);
      if (!hasAccess) {
        return Response.json({ error: "No access" }, { status: 403 });
      }
      break;
    }
  }

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("member-content")
    .download(filePath);

  if (error || !data) {
    return Response.json({ error: "File not found" }, { status: 404 });
  }

  const filename = filePath.split("/").pop() ?? "download.pdf";

  return new Response(data, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
