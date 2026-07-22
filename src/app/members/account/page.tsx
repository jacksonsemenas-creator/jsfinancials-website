import { getUser } from "@/lib/entitlements";
import type { Metadata } from "next";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = {
  title: "Account Settings",
};

export default async function AccountPage() {
  const user = await getUser();
  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
        Account Settings
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Manage your account details and security.
      </p>

      {/* Profile info */}
      <div className="mt-8">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
          Profile
        </h2>
        <div className="border border-gold/10 rounded-lg bg-navy-light px-5 py-4 space-y-3">
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-white text-sm mt-0.5">{user.email}</p>
          </div>
          {user.user_metadata?.first_name && (
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-white text-sm mt-0.5">
                {user.user_metadata.first_name}
                {user.user_metadata.last_name
                  ? ` ${user.user_metadata.last_name}`
                  : ""}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500">Member since</p>
            <p className="text-white text-sm mt-0.5">
              {new Date(user.created_at).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
          Change Password
        </h2>
        <div className="border border-gold/10 rounded-lg bg-navy-light px-5 py-5">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
