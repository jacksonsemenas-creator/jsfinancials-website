import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
};

export default async function SignupPage(props: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirect = searchParams.redirect ?? "/members";

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-white tracking-wide">
            Create Account
          </h1>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Sign up to access your purchased content, reports, and courses.
          </p>
        </div>

        <SignupForm redirect={redirect} />

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-gold hover:text-gold-light transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
}
