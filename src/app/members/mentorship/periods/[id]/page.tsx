import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import ContentViewer from "@/app/members/mentorship/ContentViewer";
import PeriodFiles from "./PeriodFiles";

export default async function PeriodDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: item } = await supabase
    .from("content_items")
    .select("*")
    .eq("id", id)
    .eq("type", "period_doc")
    .single();

  if (!item) notFound();

  // Get associated data files for this period
  const { data: dataFiles } = await supabase
    .from("content_items")
    .select("id, title, storage_path")
    .eq("type", "resource")
    .eq("period", item.period)
    .order("sort_order", { ascending: true });

  const { data: progress } = await supabase
    .from("progress_items")
    .select("id")
    .eq("client_id", user.id)
    .eq("content_id", id)
    .limit(1);

  return (
    <div>
      <ContentViewer
        item={item}
        clientId={user.id}
        completed={!!progress?.length}
      />

      {dataFiles && dataFiles.length > 0 && (
        <PeriodFiles files={dataFiles} />
      )}
    </div>
  );
}
