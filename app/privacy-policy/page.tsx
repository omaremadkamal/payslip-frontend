import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--app-surface)] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.35)] sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--brand-500)]">
          Payroll Slips
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          Privacy Policy
        </h1>
        <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
          <p>
            This mock environment stores demo auth data, onboarding drafts, and session state locally in your browser so you can test the UI before the API is ready.
          </p>
          <p>
            No real backend calls are made, and no data leaves the browser in the current build.
          </p>
        </div>
        <Link className="mt-8 inline-flex font-medium text-[var(--brand-600)]" href={ROUTES.login}>
          Return to sign in
        </Link>
      </div>
    </main>
  );
}

