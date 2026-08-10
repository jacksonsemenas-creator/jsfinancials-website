import { requireAdmin } from "@/lib/portal";
import PortalSidebar from "@/app/portal/PortalSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdmin();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-[#0A1628]">
      <PortalSidebar
        fullName={profile.full_name ?? "Admin"}
        role={profile.role}
        currentPeriod={profile.current_period}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
