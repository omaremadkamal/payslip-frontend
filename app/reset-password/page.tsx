"use client";

// CHANGE [B-07 / RP-1, RP-3]: New page for the reset-password flow.
// WHY: The backend emails a link to /reset-password?token=... but no such page existed in the frontend.
// IMPACT IF LEFT: Every password reset email contains a dead link; users can never finish a reset.

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/auth/button";
import { FormCard } from "@/components/auth/form-card";
import { FooterLinks } from "@/components/auth/footer-links";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { PasswordField } from "@/components/auth/password-field";
import { api, ApiError } from "@/lib/api-client";
import { ROUTES } from "@/lib/routes";

// CHANGE [B-07 / RP-3]: Mirror the backend's ResetPasswordDto password regex on the client.
// WHY: Backend requires upper + lower + digit + special from @.#$!%*?& and 8–64 chars.
// IMPACT IF LEFT: A weak password would only fail server-side with a generic 400.
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,64}$/;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [isValidating, setIsValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CHANGE [B-07 / RP-3]: Validate the token via GET /auth/reset-password?token=... on mount.
  // WHY: Surfacing expiry/invalid early avoids the user filling out the form for nothing.
  // IMPACT IF LEFT: User types a new password, hits submit, then sees a 401 from the POST.
  useEffect(() => {
    let cancelled = false;

    async function validateToken() {
      if (!token) {
        router.replace(ROUTES.forgotPassword);
        return;
      }
      try {
        await api.get(`/auth/reset-password?token=${encodeURIComponent(token)}`);
        if (!cancelled) {
          setTokenValid(true);
          setIsValidating(false);
        }
      } catch {
        if (!cancelled) {
          router.replace(ROUTES.forgotPassword);
        }
      }
    }

    void validateToken();
    return () => {
      cancelled = true;
    };
  }, [router, token]);

  if (isValidating || !tokenValid) {
    return <LoadingScreen />;
  }

  // CHANGE [B-07 / RP-3]: Submit POSTs to /auth/reset-password with the full ResetPasswordDto shape.
  // WHY: Backend DTO requires resetToken, newPassword, confirmPassword; the @Match decorator cross-checks them server-side too.
  // IMPACT IF LEFT: The reset flow can't actually change the password.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!PASSWORD_REGEX.test(newPassword)) {
      setError(
        "Password must be 8–64 characters and include an uppercase letter, lowercase letter, number, and special character (@.#$!%*?&).",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/auth/reset-password", {
        resetToken: token,
        newPassword,
        confirmPassword,
      });
      router.replace(ROUTES.login);
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Unable to reset your password right now.");
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
          description="Choose a new password to finish resetting your account."
          title="Reset Password"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <PasswordField
              hint="At least 8 characters, with upper + lower + digit + one of @.#$!%*?&."
              id="new-password"
              label="New Password"
              onChange={setNewPassword}
              value={newPassword}
            />

            <PasswordField
              hint="Re-enter the password above."
              id="confirm-password"
              label="Confirm Password"
              onChange={setConfirmPassword}
              value={confirmPassword}
            />

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button loading={isSubmitting} type="submit">
              Reset Password
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
