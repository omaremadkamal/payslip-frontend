"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/auth/button";
import { FormCard } from "@/components/auth/form-card";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { useAuth } from "@/components/providers/auth-provider";
import { ROUTES } from "@/lib/routes";

export default function OrganizationBrandingPage() {
  const router = useRouter();
  const { isReady, onboarding, saveDraft, user } = useAuth();
  const [brandColor, setBrandColor] = useState(onboarding.branding.brandColor);
  const [logoName, setLogoName] = useState(onboarding.branding.logoName);

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
      setBrandColor(onboarding.branding.brandColor);
      setLogoName(onboarding.branding.logoName);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [onboarding.branding.brandColor, onboarding.branding.logoName]);

  if (!isReady || !user || user.onboardingComplete) {
    return <LoadingScreen />;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0];
    setLogoName(nextFile?.name ?? "");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveDraft({
      ...onboarding,
      branding: {
        brandColor,
        logoName,
      },
    });
    router.push(ROUTES.communicationSettings);
  }

  return (
    <main className="min-h-screen bg-[var(--app-surface)] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <FormCard
          description="Add a visual identity that will carry into the dashboard and communication settings."
          title="Create New Organization"
        >
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <label className="flex cursor-pointer flex-col gap-3">
                <span className="text-sm font-medium text-slate-700">Organization Logo</span>
                <div className="flex min-h-56 flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                    +
                  </div>
                  <p className="mt-4 text-base font-semibold text-[var(--brand-600)]">
                    {logoName || "Upload a file"}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">PNG, JPG, SVG up to 5MB</p>
                </div>
                <input className="sr-only" onChange={handleFileChange} type="file" />
              </label>

              <div className="space-y-4">
                <label className="flex flex-col gap-3 text-sm font-medium text-slate-700">
                  <span>Brand Color</span>
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <input
                      className="h-12 w-12 cursor-pointer rounded-xl border-none bg-transparent"
                      onChange={(event) => setBrandColor(event.target.value)}
                      type="color"
                      value={brandColor}
                    />
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{brandColor}</p>
                      <p className="text-sm text-slate-500">
                        Pick a primary color for your organization&apos;s dashboard.
                      </p>
                    </div>
                  </div>
                </label>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5">
                  <p className="text-sm font-medium text-slate-700">Preview</p>
                  <div className="mt-4 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                    <div
                      className="h-12 w-12 rounded-2xl"
                      style={{ backgroundColor: brandColor }}
                    />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {onboarding.companyDetails.companyName || "Your organization"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {logoName || "No logo selected yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button onClick={() => router.push(ROUTES.createOrganization)} type="button" variant="secondary">
                Back
              </Button>
              <Button type="submit">Create Organization</Button>
            </div>
          </form>
        </FormCard>
      </div>
    </main>
  );
}
