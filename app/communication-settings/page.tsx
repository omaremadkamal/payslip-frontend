"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/auth/button";
import { FormCard } from "@/components/auth/form-card";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { TextField } from "@/components/auth/text-field";
import { useAuth } from "@/components/providers/auth-provider";
// CHANGE [B-11, B-12]: POST the SMTP config to the protected /settings/communication endpoint.
// WHY: This was previously local-only; the backend needs the values for actual email delivery.
// IMPACT IF LEFT: Onboarding "completes" but no settings exist server-side.
import { api, ApiError } from "@/lib/api-client";
import { ROUTES } from "@/lib/routes";

export default function CommunicationSettingsPage() {
  const router = useRouter();
  const { finalizeOnboarding, isReady, onboarding, user } = useAuth();
  const [form, setForm] = useState(onboarding.communication);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!user) {
      router.replace(ROUTES.login);
      return;
    }

    if (user.onboardingComplete) {
      router.replace(ROUTES.dashboard);
    }
  }, [isReady, router, user]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setForm(onboarding.communication);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [onboarding.communication]);

  if (!isReady || !user || user.onboardingComplete) {
    return <LoadingScreen />;
  }

  // CHANGE [B-11]: Generic over value type so smtpPort (number) and smtpSecurity (enum) stay typed.
  // WHY: TextField always emits string; the caller converts before passing in.
  // IMPACT IF LEFT: Mixing string into a numeric field reaches the backend as a type mismatch.
  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  // CHANGE [B-11, B-12]: Submit POSTs to /settings/communication, then refreshes /me via finalizeOnboarding.
  // WHY: This is the last onboarding step; after it succeeds, the server-side onboardingComplete flips to true.
  // IMPACT IF LEFT: Onboarding never completes server-side and the user stays in a "pending" state.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await api.post("/settings/communication", {
        senderName: form.senderName,
        senderTitle: form.senderTitle,
        senderDepartment: form.senderDepartment,
        smtpHost: form.smtpHost,
        smtpPort: form.smtpPort,
        smtpSecurity: form.smtpSecurity,
        senderEmail: form.senderEmail,
        senderPassword: form.senderPassword,
      });
      await finalizeOnboarding({
        ...onboarding,
        communication: form,
      });
      router.push(ROUTES.profileCompleted);
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Unable to save communication settings right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--app-surface)] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <FormCard
          description="Configure email settings for system notifications and communications."
          title="Communication Settings"
        >
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Sender Information</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Set the sender identity shown in payroll emails and reminders.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  id="sender-name"
                  label="Sender Name"
                  onChange={(event) => updateField("senderName", event.target.value)}
                  placeholder="e.g. HR Team"
                  type="text"
                  value={form.senderName}
                />
                <TextField
                  id="sender-title"
                  label="Sender Title"
                  onChange={(event) => updateField("senderTitle", event.target.value)}
                  placeholder="e.g. HR Manager"
                  type="text"
                  value={form.senderTitle}
                />
              </div>

              <TextField
                id="sender-department"
                label="Sender Department"
                onChange={(event) => updateField("senderDepartment", event.target.value)}
                placeholder="e.g. Human Resources"
                type="text"
                value={form.senderDepartment}
              />
            </div>

            <div className="space-y-5 border-t border-slate-100 pt-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">SMTP Configuration</h2>
                <p className="mt-1 text-sm text-slate-500">
                  These values are stored as mock data and can be swapped for API payloads later.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* CHANGE [B-11]: host → smtpHost. Backend DTO field name. */}
                {/* WHY: ValidationPipe(whitelist:true) strips the old key so @IsNotEmpty(smtpHost) fails. */}
                {/* IMPACT IF LEFT: Submit returns 400 "smtpHost should not be empty". */}
                <TextField
                  id="smtp-host"
                  label="Host"
                  onChange={(event) => updateField("smtpHost", event.target.value)}
                  placeholder="e.g. smtp.office365.com"
                  type="text"
                  value={form.smtpHost}
                />
                {/* CHANGE [B-11]: port (string) → smtpPort (number). Cast on input. */}
                {/* WHY: Backend DTO declares smtpPort: number with @IsNumber(); string form rejected. */}
                {/* IMPACT IF LEFT: Submit returns 400 "smtpPort must be a number conforming to the specified constraints". */}
                <TextField
                  id="smtp-port"
                  label="Port Number"
                  onChange={(event) =>
                    updateField(
                      "smtpPort",
                      event.target.value === "" ? 0 : Number(event.target.value),
                    )
                  }
                  placeholder="e.g. 587"
                  type="number"
                  value={String(form.smtpPort)}
                />
              </div>

              {/* CHANGE [B-11]: security (free text) → smtpSecurity (enum TLS | SSL | NONE). */}
              {/* WHY: Backend DTO uses @IsEnum(SMTP_SECURITY); free text fails enum validation. */}
              {/* IMPACT IF LEFT: Submit returns 400 "smtpSecurity must be one of the following values: TLS, SSL, NONE". */}
              <div className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
                <label htmlFor="smtp-security">Security</label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[var(--brand-300)] focus:ring-4 focus:ring-[var(--brand-100)]"
                  id="smtp-security"
                  onChange={(event) =>
                    updateField(
                      "smtpSecurity",
                      event.target.value as "TLS" | "SSL" | "NONE",
                    )
                  }
                  value={form.smtpSecurity}
                >
                  <option value="TLS">TLS</option>
                  <option value="SSL">SSL</option>
                  <option value="NONE">NONE</option>
                </select>
              </div>
            </div>

            <div className="space-y-5 border-t border-slate-100 pt-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Email Authentication</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Use placeholder credentials now and replace them with secure secrets once the backend is wired.
                </p>
              </div>

              <TextField
                autoComplete="email"
                id="sender-email"
                label="Sender Email"
                onChange={(event) => updateField("senderEmail", event.target.value)}
                placeholder="e.g. hr@company.com"
                type="email"
                value={form.senderEmail}
              />

              <TextField
                id="sender-password"
                label="Sender's Email Password"
                onChange={(event) => updateField("senderPassword", event.target.value)}
                placeholder="••••••••"
                type="password"
                value={form.senderPassword}
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:justify-end">
              <Button onClick={() => router.push(ROUTES.organizationBranding)} type="button" variant="secondary">
                Back
              </Button>
              <Button loading={isSubmitting} type="submit">
                Next
              </Button>
            </div>
          </form>
        </FormCard>
      </div>
    </main>
  );
}
