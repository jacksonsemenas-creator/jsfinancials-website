"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.push("/members");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-900/30 border border-red-700/50 text-red-300 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300 mb-1.5"
        >
          New Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gold/20 bg-navy-light px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
          placeholder="At least 8 characters"
        />
      </div>

      <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-300 mb-1.5"
        >
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          required
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg border border-gold/20 bg-navy-light px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
          placeholder="Re-enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy tracking-wide uppercase hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
