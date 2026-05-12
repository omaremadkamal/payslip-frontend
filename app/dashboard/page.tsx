"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppFrame } from "@/components/auth/app-frame";
import { Button } from "@/components/auth/button";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { useAuth } from "@/components/providers/auth-provider";
import { dashboardActivity, dashboardMetrics } from "@/lib/mock-auth";
import { ROUTES } from "@/lib/routes";

export default function DashboardPage() {
  const router = useRouter();
  const { isReady, onboarding, signOut, user } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!user) {
      router.replace(ROUTES.login);
      return;
    }

    if (!user.onboardingComplete) {
      router.replace(ROUTES.createOrganization);
    }
  }, [isReady, router, user]);

  if (!isReady || !user || !user.onboardingComplete) {
    return <LoadingScreen />;
  }

  return (
    <AppFrame
      actions={
        <Button
          onClick={() => {
            signOut();
            router.push(ROUTES.login);
          }}
          type="button"
          variant="secondary"
        >
          Sign Out
        </Button>
      }
      description="This mock dashboard proves the auth and onboarding flow end-to-end until the real API is connected."
      title={`Welcome back, ${user.firstName}`}
    >
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <article
                className="rounded-[24px] bg-white p-5 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.4)]"
                key={metric.label}
              >
                <p className="text-sm text-slate-500">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  {metric.value}
                </p>
              </article>
            ))}
          </div>

          <article className="rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.4)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Organization Snapshot</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Mock data persisted from your onboarding forms.
                </p>
              </div>
              <div
                className="h-12 w-12 rounded-2xl"
                style={{ backgroundColor: onboarding.branding.brandColor }}
              />
            </div>

            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-slate-500">Company Name</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">
                  {onboarding.companyDetails.companyName}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Commercial Reg. Number</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">
                  {onboarding.companyDetails.commercialRegistrationNumber}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Tax ID</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">
                  {onboarding.companyDetails.taxIdNumber}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Default Currency</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">
                  {onboarding.companyDetails.defaultCurrency}
                </dd>
              </div>
            </dl>
          </article>
        </section>

        <aside className="space-y-6">
          <article className="rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.4)]">
            <h2 className="text-xl font-semibold text-slate-900">Communication Settings</h2>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-sm text-slate-500">Sender</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">
                  {onboarding.communication.senderName}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">SMTP Host</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">
                  {onboarding.communication.host}:{onboarding.communication.port}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Security</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">
                  {onboarding.communication.security}
                </dd>
              </div>
            </dl>
          </article>

          <article className="rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.4)]">
            <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
            <ul className="mt-5 space-y-4">
              {dashboardActivity.map((activity) => (
                <li className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600" key={activity}>
                  {activity}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </div>
    </AppFrame>
  );
}

