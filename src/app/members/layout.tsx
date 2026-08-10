import { redirect } from "next/navigation";
import { getUser, isAdmin } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";
import MembersSidebar from "./MembersSidebar";

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const firstName =
    user.user_metadata?.first_name ??
    user.user_metadata?.full_name?.split(" ")[0] ??
    "there";

  const admin = await isAdmin(user.id);

  // Check if user has a mentorship profile
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .limit(1)
    .single();

  const hasMentorship = !!profile || admin;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-navy">
      <MembersSidebar
        firstName={firstName}
        isAdmin={admin}
        hasMentorship={hasMentorship}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
