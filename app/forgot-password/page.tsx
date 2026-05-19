"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/auth/button";
import { FormCard } from "@/components/auth/form-card";
import { FooterLinks } from "@/components/auth/footer-links";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { TextField } from "@/components/auth/text-field";
import { useAuth } from "@/components/providers/auth-provider";
// CHANGE [B-06]: Wire the forgot-password form to the real backend.
// WHY: The previous handler was a setTimeout mock that never actually sent a reset email.
// IMPACT IF LEFT: Clicking "Send Reset Link" silently does nothing; users never receive an email.
import { api, ApiError } from "@/lib/api-client";
import { ROUTES } from "@/lib/routes";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { isReady, user } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isReady || !user) {
      return;
    }

    router.replace(user.onboardingComplete ? ROUTES.dashboard : ROUTES.createOrganization);
  }, [isReady, router, user]);

  if (!isReady || user) {
    return <LoadingScreen />;
  }

  // CHANGE [B-06]: POST /auth/forgot-password instead of the setTimeout mock.
  // WHY: The form needs to trigger a real email; show whatever generic message the server returns.
  // IMPACT IF LEFT: Users never receive a reset email and the success message is a lie.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const response = (await api.post("/auth/forgot-password", { email })) as
        | { message: string }
        | string;
      const message =
        typeof response === "string" ? response : (response?.message ?? "");
      setSuccess(message || `If an account exists for ${email}, a reset link has been sent.`);
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Unable to request a reset link right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--app-surface)] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link className="text-lg font-semibold tracking-tight text-slate-900" href={ROUTES.login}>
            Payroll Slips
          </Link>
        </div>

        <FormCard
          description="Enter the email address associated with your account and we’ll simulate the reset email flow."
          title="Forgot Password?"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextField
              autoComplete="email"
              id="reset-email"
              label="Work Email Address"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="e.g. name@company.com"
              type="email"
              value={email}
            />

            {success ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p> : null}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button loading={isSubmitting} type="submit">
              Send Reset Link
            </Button>
          </form>

          <div className="mt-8 space-y-5 text-center">
            <FooterLinks />
          </div>
        </FormCard>
      </div>
    </main>
  );
}
