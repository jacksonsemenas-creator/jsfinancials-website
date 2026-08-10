import { getProfile } from "@/lib/portal";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ContentViewer from "@/app/portal/ContentViewer";

export default async function ModuleDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const profile = await getProfile();
  const supabase = await createClient();

  const { data: item } = await supabase
    .from("content_items")
    .select("*")
    .eq("id", id)
    .eq("type", "applicability_module")
    .single();

  if (!item) notFound();

  const { data: progress } = await supabase
    .from("progress_items")
    .select("id")
    .eq("client_id", profile.id)
    .eq("content_id", id)
    .limit(1);

  return (
    <ContentViewer
      item={item}
      clientId={profile.id}
      completed={!!progress?.length}
    />
  );
}
