import { getUser } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import ContentViewer from "@/app/members/mentorship/ContentViewer";

export default async function VideoDetailPage(props: {
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
    .eq("type", "video")
    .single();

  if (!item) notFound();

  const { data: progress } = await supabase
    .from("progress_items")
    .select("id")
    .eq("client_id", user.id)
    .eq("content_id", id)
    .limit(1);

  return (
    <ContentViewer
      item={item}
      clientId={user.id}
      completed={!!progress?.length}
    />
  );
}
