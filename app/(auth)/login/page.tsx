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

export default function LoginPage() {
  const router = useRouter();
  const { isReady, signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const nextUser = await signIn({ email, password, remember });
      router.push(nextUser.onboardingComplete ? ROUTES.dashboard : ROUTES.createOrganization);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to sign in right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      sideCopy="The all-in-one platform for payroll, benefits, and HR compliance built for modern teams."
      sideHeading="Simplify your workforce management."
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            Sign in to your account
          </h2>
          <p className="text-base text-slate-500">
            Best practice for a product-first payroll app is to land returning users on sign in, with sign up as the secondary CTA.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            autoComplete="email"
            id="login-email"
            label="Email Address"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="e.g. name@company.com"
            type="email"
            value={email}
          />

          <PasswordField
            id="login-password"
            label="Password"
            labelAction={
              <Link
                className="text-sm font-medium text-[var(--brand-600)] transition hover:text-[var(--brand-700)]"
                href={ROUTES.forgotPassword}
              >
                Forgot Password?
              </Link>
            }
            onChange={setPassword}
            value={password}
          />

          <CheckboxField
            checked={remember}
            id="remember-session"
            label="Remember me for 30 days"
            onChange={setRemember}
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button loading={isSubmitting} type="submit">
            Sign In
          </Button>
        </form>

        <div className="space-y-5 text-center">
          <p className="text-base text-slate-500">
            Don&apos;t have an account?{" "}
            <Link className="font-semibold text-[var(--brand-600)]" href={ROUTES.signup}>
              Sign Up Now
            </Link>
          </p>
          <FooterLinks />
        </div>
      </div>
    </AuthShell>
  );
}
