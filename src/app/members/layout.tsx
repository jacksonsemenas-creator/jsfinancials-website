import { redirect } from "next/navigation";
import { getUser, isAdmin } from "@/lib/entitlements";
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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-navy">
      <MembersSidebar firstName={firstName} isAdmin={admin} />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
