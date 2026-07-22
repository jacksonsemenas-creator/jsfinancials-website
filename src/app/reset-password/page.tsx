import type { Metadata } from "next";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set New Password",
};

export default function ResetPasswordPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-white tracking-wide">
            Set New Password
          </h1>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Enter your new password below.
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </section>
  );
}
