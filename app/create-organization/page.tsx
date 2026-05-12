"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/auth/button";
import { FormCard } from "@/components/auth/form-card";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { TextField } from "@/components/auth/text-field";
import { useAuth } from "@/components/providers/auth-provider";
import { ROUTES } from "@/lib/routes";

export default function CreateOrganizationPage() {
  const router = useRouter();
  const { isReady, onboarding, saveDraft, user } = useAuth();
  const [error, setError] = useState("");
  const [form, setForm] = useState(onboarding.companyDetails);

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
      setForm(onboarding.companyDetails);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [onboarding.companyDetails]);

  if (!isReady || !user || user.onboardingComplete) {
    return <LoadingScreen />;
  }

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.companyName || !form.commercialRegistrationNumber || !form.taxIdNumber) {
      setError("Fill in the required company details before continuing.");
      return;
    }

    saveDraft({
      ...onboarding,
      companyDetails: form,
    });
    router.push(ROUTES.organizationBranding);
  }

  return (
    <main className="min-h-screen bg-[var(--app-surface)] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <FormCard
          description="Enter your company details to set up a new payroll workspace."
          title="Create New Organization"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextField
              id="company-name"
              label="Company Name"
              onChange={(event) => updateField("companyName", event.target.value)}
              placeholder="e.g. Acme Corp"
              type="text"
              value={form.companyName}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <TextField
                id="commercial-registration-number"
                label="Commercial Reg. Number"
                onChange={(event) =>
                  updateField("commercialRegistrationNumber", event.target.value)
                }
                placeholder="e.g. 12345678"
                type="text"
                value={form.commercialRegistrationNumber}
              />
              <TextField
                id="tax-id-number"
                label="Tax ID Number"
                onChange={(event) => updateField("taxIdNumber", event.target.value)}
                placeholder="e.g. 987-654-321"
                type="text"
                value={form.taxIdNumber}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <TextField
                id="default-currency"
                label="Default Currency"
                onChange={(event) => updateField("defaultCurrency", event.target.value)}
                type="text"
                value={form.defaultCurrency}
              />
              <TextField
                id="exchange-rate"
                label="Currency Exchange Rate (EGP)"
                onChange={(event) => updateField("exchangeRate", event.target.value)}
                type="number"
                value={form.exchangeRate}
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button onClick={() => router.push(ROUTES.signup)} type="button" variant="secondary">
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </FormCard>
      </div>
    </main>
  );
}
