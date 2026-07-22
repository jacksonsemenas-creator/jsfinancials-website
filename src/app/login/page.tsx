import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Member Login",
};

export default async function LoginPage(props: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirect = searchParams.redirect ?? "/members";

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-white tracking-wide">
            Member Login
          </h1>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Access your Daily Macro Report archive, course content, and account.
          </p>
        </div>

        <LoginForm redirect={redirect} />

        <p className="mt-6 text-center text-sm text-gray-500">
          <a
            href="/forgot-password"
            className="text-gold hover:text-gold-light transition-colors"
          >
            Forgot your password?
          </a>
        </p>
      </div>
    </section>
  );
}
