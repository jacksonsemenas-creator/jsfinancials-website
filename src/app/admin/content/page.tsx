import { requireAdmin } from "@/lib/portal";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import ContentManager from "./ContentManager";

export const metadata: Metadata = {
  title: "Content Manager | Mentorship Portal",
};

export default async function AdminContentPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: items } = await supabase
    .from("content_items")
    .select("*")
    .order("type")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Content Manager
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Create, edit, and manage all mentorship content.
      </p>

      <ContentManager items={items ?? []} />
    </div>
  );
}
