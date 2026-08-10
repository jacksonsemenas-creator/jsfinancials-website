import type { Metadata } from "next";
import PortalLoginForm from "./PortalLoginForm";

export const metadata: Metadata = {
  title: "Mentorship Login",
};

export default async function PortalLoginPage(props: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirectTo = searchParams.redirect ?? "/portal";

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A1628] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-white tracking-wide">
            Mentorship Portal
          </h1>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Sign in to access your mentorship dashboard.
          </p>
        </div>

        <PortalLoginForm redirect={redirectTo} />

        <p className="mt-6 text-center text-sm text-gray-500">
          <a
            href="/forgot-password"
            className="text-[#C9A84C] hover:text-[#C9A84C]/80 transition-colors"
          >
            Forgot your password?
          </a>
        </p>
      </div>
    </section>
  );
}
