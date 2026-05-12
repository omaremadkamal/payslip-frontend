import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[var(--app-surface)] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.35)] sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--brand-500)]">
          Payroll Slips
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          Terms of Service
        </h1>
        <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
          <p>
            This frontend is configured as a mock application environment. Use the seeded credentials to test the login flow and replace the mocked browser storage layer with your API client when the backend is available.
          </p>
          <p>
            Demo data may be cleared at any time by removing local browser storage.
          </p>
        </div>
        <Link className="mt-8 inline-flex font-medium text-[var(--brand-600)]" href={ROUTES.login}>
          Return to sign in
        </Link>
      </div>
    </main>
  );
}

