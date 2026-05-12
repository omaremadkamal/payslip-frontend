"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/auth/button";
import { FormCard } from "@/components/auth/form-card";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { TextField } from "@/components/auth/text-field";
import { useAuth } from "@/components/providers/auth-provider";
import { ROUTES } from "@/lib/routes";

export default function CommunicationSettingsPage() {
  const router = useRouter();
  const { finalizeOnboarding, isReady, onboarding, user } = useAuth();
  const [form, setForm] = useState(onboarding.communication);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    await finalizeOnboarding({
      ...onboarding,
      communication: form,
    });
    router.push(ROUTES.profileCompleted);
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
                <TextField
                  id="smtp-host"
                  label="Host"
                  onChange={(event) => updateField("host", event.target.value)}
                  placeholder="e.g. smtp.office365.com"
                  type="text"
                  value={form.host}
                />
                <TextField
                  id="smtp-port"
                  label="Port Number"
                  onChange={(event) => updateField("port", event.target.value)}
                  placeholder="e.g. 587"
                  type="text"
                  value={form.port}
                />
              </div>

              <TextField
                id="smtp-security"
                label="Security"
                onChange={(event) => updateField("security", event.target.value)}
                placeholder="TLS"
                type="text"
                value={form.security}
              />
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
