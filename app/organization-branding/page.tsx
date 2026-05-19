"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/auth/button";
import { FormCard } from "@/components/auth/form-card";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { useAuth } from "@/components/providers/auth-provider";
// CHANGE [B-09, B-12]: Use the API client to PATCH branding with multipart/form-data.
// WHY: Backend uses FileInterceptor('logo') and the protected endpoint needs the Bearer header.
// IMPACT IF LEFT: Logo never reaches S3 and brand color is never persisted server-side.
import { api, ApiError } from "@/lib/api-client";
import { ROUTES } from "@/lib/routes";

export default function OrganizationBrandingPage() {
  const router = useRouter();
  const { isReady, onboarding, saveDraft, user } = useAuth();
  const [brandColor, setBrandColor] = useState(onboarding.branding.brandColor);
  const [logoName, setLogoName] = useState(onboarding.branding.logoName);
  // CHANGE [B-09]: Hold the actual File object alongside its display name.
  // WHY: The backend expects the binary file, not its filename; previous state only kept the string.
  // IMPACT IF LEFT: Upload sends nothing meaningful and the logo never lands in S3.
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [error, setError] = useState("");
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
      setBrandColor(onboarding.branding.brandColor);
      setLogoName(onboarding.branding.logoName);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [onboarding.branding.brandColor, onboarding.branding.logoName]);

  if (!isReady || !user || user.onboardingComplete) {
    return <LoadingScreen />;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    // CHANGE [B-09]: Capture the File itself, not just its name.
    // WHY: FormData needs the actual binary blob to send multipart/form-data.
    // IMPACT IF LEFT: Submission would send a string filename and the server would treat it as no file uploaded.
    setLogoFile(nextFile);
    setLogoName(nextFile?.name ?? "");
  }

  // CHANGE [B-09, B-10, B-12]: PATCH /organizations/:id with FormData when there's a file or a colour change.
  // WHY: The endpoint expects multipart/form-data, requires the org id from step 1, and is protected.
  // IMPACT IF LEFT: No branding ever reaches the server even if the user fills the form.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!onboarding.organizationId) {
      setError("Your organisation hasn't been created yet — go back and complete step 1.");
      return;
    }

    setIsSubmitting(true);
    try {
      const hasFile = logoFile !== null;
      const hasColourChange = brandColor && brandColor !== onboarding.branding.brandColor;
      if (hasFile || hasColourChange || brandColor) {
        const formData = new FormData();
        if (brandColor) formData.append("brandColor", brandColor);
        // CHANGE [B-09]: Append the File under the field name `logo`, matching FileInterceptor('logo').
        // WHY: The interceptor only reads the `logo` form field; any other key is ignored.
        // IMPACT IF LEFT: Upload silently does nothing.
        if (logoFile) formData.append("logo", logoFile);
        // CHANGE [B-09]: Pass FormData directly — do NOT set Content-Type.
        // WHY: The browser must set multipart boundary; manually setting Content-Type breaks the request.
        // IMPACT IF LEFT: Server can't parse the multipart body and returns 400.
        await api.patch(`/organizations/${onboarding.organizationId}`, formData);
      }

      saveDraft({
        ...onboarding,
        branding: {
          brandColor,
          logoName,
        },
      });
      router.push(ROUTES.communicationSettings);
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Unable to save branding right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
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

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button onClick={() => router.push(ROUTES.createOrganization)} type="button" variant="secondary">
                Back
              </Button>
              <Button loading={isSubmitting} type="submit">Create Organization</Button>
            </div>
          </form>
        </FormCard>
      </div>
    </main>
  );
}
