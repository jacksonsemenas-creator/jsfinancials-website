import type { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-white tracking-wide">
            Reset Password
          </h1>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Enter your email and we will send you a link to reset your password.
          </p>
        </div>

        <ForgotPasswordForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          <a
            href="/login"
            className="text-gold hover:text-gold-light transition-colors"
          >
            Back to login
          </a>
        </p>
      </div>
    </section>
  );
}
