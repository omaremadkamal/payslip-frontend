"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/auth/button";
import { FormCard } from "@/components/auth/form-card";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { TextField } from "@/components/auth/text-field";
import { useAuth } from "@/components/providers/auth-provider";
// CHANGE [B-10, B-12]: Import the API client so step 1 can actually POST /organizations.
// WHY: Previously this page wrote to localStorage only; the organisation must exist server-side before branding/settings.
// IMPACT IF LEFT: Steps 2 and 3 have no real organization id to target.
import { api, ApiError } from "@/lib/api-client";
import { ROUTES } from "@/lib/routes";

type CreateOrgResponse = { message: string; organizationId: string };

export default function CreateOrganizationPage() {
  const router = useRouter();
  const { isReady, onboarding, saveDraft, user } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // CHANGE [B-08]: updateField accepts string values; numeric coercion happens at the call site.
  // WHY: TextField onChange always emits a string; currencyExchangeRate must be cast to number before reaching the draft.
  // IMPACT IF LEFT: Mixing types here would either break the type signature or send a string to a numeric backend field.
  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  // CHANGE [B-10, B-12]: Submit POSTs to /organizations, captures the returned id, then advances to branding.
  // WHY: The branding step needs a real organisation id; this is where it gets created.
  // IMPACT IF LEFT: Without a real POST, step 2 has no org to PATCH and step 3 has no org for settings to attach to.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.companyName || !form.commercialRegNumber || !form.taxIdNumber) {
      setError("Fill in the required company details before continuing.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = (await api.post("/organizations", {
        companyName: form.companyName,
        commercialRegNumber: form.commercialRegNumber,
        taxIdNumber: form.taxIdNumber,
        defaultCurrency: form.defaultCurrency,
        currencyExchangeRate: form.currencyExchangeRate,
      })) as CreateOrgResponse;

      saveDraft({
        ...onboarding,
        organizationId: response.organizationId,
        companyDetails: form,
      });
      router.push(ROUTES.organizationBranding);
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Unable to create the organisation right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
              {/* CHANGE [B-08]: Renamed field commercialRegistrationNumber → commercialRegNumber to match CreateOrganizationDto. */}
              {/* WHY: ValidationPipe(whitelist:true) silently drops the old key and @IsNotEmpty fails. */}
              {/* IMPACT IF LEFT: Submit returns 400 with "commercialRegNumber should not be empty". */}
              <TextField
                id="commercial-registration-number"
                label="Commercial Reg. Number"
                onChange={(event) =>
                  updateField("commercialRegNumber", event.target.value)
                }
                placeholder="e.g. 12345678"
                type="text"
                value={form.commercialRegNumber}
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
              {/* CHANGE [B-08]: Renamed exchangeRate → currencyExchangeRate AND cast to number on input. */}
              {/* WHY: Backend DTO declares currencyExchangeRate: number with @IsNumber(); sending a string fails @IsNumber validation. */}
              {/* IMPACT IF LEFT: Submit returns 400 with "currencyExchangeRate must be a number conforming to the specified constraints". */}
              <TextField
                id="exchange-rate"
                label="Currency Exchange Rate (EGP)"
                onChange={(event) =>
                  updateField(
                    "currencyExchangeRate",
                    event.target.value === "" ? 0 : Number(event.target.value),
                  )
                }
                type="number"
                value={String(form.currencyExchangeRate)}
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button onClick={() => router.push(ROUTES.signup)} type="button" variant="secondary">
                Back
              </Button>
              <Button loading={isSubmitting} type="submit">Next</Button>
            </div>
          </form>
        </FormCard>
      </div>
    </main>
  );
}
