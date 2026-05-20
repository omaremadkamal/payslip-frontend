"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/auth/button";
import { CheckboxField } from "@/components/auth/checkbox-field";
import { FooterLinks } from "@/components/auth/footer-links";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { PasswordField } from "@/components/auth/password-field";
import { TextField } from "@/components/auth/text-field";
import { useAuth } from "@/components/providers/auth-provider";
import { ROUTES } from "@/lib/routes";

export default function SignupPage() {
  const router = useRouter();
  const { isReady, signUp, user } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isReady || !user) {
      return;
    }

    router.replace(
      user.onboardingComplete ? ROUTES.dashboard : ROUTES.createOrganization,
    );
  }, [isReady, router, user]);

  if (!isReady || user) {
    return <LoadingScreen />;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("You need to accept the terms before creating an account.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      router.push(ROUTES.createOrganization);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create your account.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <AuthShell
      sideCopy="Automate salaries, taxes, and social insurance with guaranteed accuracy. Our dynamic engine keeps pace with the latest Egyptian regulations."
      sideHeading="100% payroll compliance with Egyptian tax and social insurance laws."
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            Create an account
          </h2>
          <p className="text-base text-slate-500">
            Start managing your organization's payroll today.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="first-name"
              label="First Name"
              onChange={(event) => updateField("firstName", event.target.value)}
              placeholder="e.g. John"
              type="text"
              value={form.firstName}
            />
            <TextField
              id="last-name"
              label="Last Name"
              onChange={(event) => updateField("lastName", event.target.value)}
              placeholder="e.g. Doe"
              type="text"
              value={form.lastName}
            />
          </div>

          <TextField
            autoComplete="email"
            id="work-email"
            label="Work Email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="e.g. name@company.com"
            type="email"
            value={form.email}
          />

          <PasswordField
            hint="Must be at least 8 characters."
            id="signup-password"
            label="Password"
            onChange={(value) => updateField("password", value)}
            value={form.password}
          />

          <PasswordField
            hint="Re-enter your password to continue."
            id="signup-password-confirm"
            label="Confirm Password"
            onChange={(value) => updateField("confirmPassword", value)}
            value={form.confirmPassword}
          />

          <CheckboxField
            checked={acceptedTerms}
            id="accept-terms"
            label={
              <>
                I agree to the{" "}
                <Link
                  className="font-medium text-[var(--brand-600)]"
                  href={ROUTES.termsOfService}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="font-medium text-[var(--brand-600)]"
                  href={ROUTES.privacyPolicy}
                >
                  Privacy Policy
                </Link>
                .
              </>
            }
            onChange={setAcceptedTerms}
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button loading={isSubmitting} type="submit">
            Create Account
          </Button>
        </form>

        <div className="space-y-5 text-center">
          <p className="text-base text-slate-500">
            Already have an account?{" "}
            <Link
              className="font-semibold text-[var(--brand-600)]"
              href={ROUTES.login}
            >
              Sign In Now
            </Link>
          </p>
          <FooterLinks />
        </div>
      </div>
    </AuthShell>
  );
}
