import { redirect } from "next/navigation";
import { getUser, isAdmin } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import MembersSidebar from "@/app/members/MembersSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/login");

  const admin = await isAdmin(user.id);
  if (!admin) redirect("/members");

  const firstName =
    user.user_metadata?.first_name ??
    user.user_metadata?.full_name?.split(" ")[0] ??
    "Admin";

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .limit(1)
    .single();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-navy">
      <MembersSidebar
        firstName={firstName}
        isAdmin={admin}
        hasMentorship={!!profile}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
