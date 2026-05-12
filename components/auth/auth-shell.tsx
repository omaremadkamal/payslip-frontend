import { ReactNode } from "react";

type AuthShellProps = {
  sideHeading: string;
  sideCopy: string;
  children: ReactNode;
};

export function AuthShell({ sideHeading, sideCopy, children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[var(--app-surface)] lg:grid lg:grid-cols-[minmax(320px,1fr)_minmax(0,1fr)]">
      <aside className="relative overflow-hidden bg-[var(--brand-500)] px-6 py-8 text-white sm:px-10 sm:py-10 lg:flex lg:min-h-screen lg:flex-col lg:justify-between lg:px-12 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.14),_transparent_32%)]" />
        <div className="relative flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">Payroll Slips</span>
          <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80">
            Payroll OS
          </span>
        </div>

        <div className="relative mt-14 max-w-xl lg:mt-0">
          <h1 className="max-w-md text-4xl font-semibold leading-tight sm:text-5xl">
            {sideHeading}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/82 sm:text-lg">
            {sideCopy}
          </p>
        </div>

        <div className="relative mt-10 flex items-center gap-4 text-sm text-white/88 lg:mt-0">
          <div className="flex items-center">
            <span className="h-8 w-8 rounded-full border border-white/60 bg-white/12" />
            <span className="-ml-2 h-8 w-8 rounded-full border border-white/60 bg-white/20" />
            <span className="-ml-2 h-8 w-8 rounded-full border border-white/60 bg-white/32" />
          </div>
          <p>Trusted by 5,000+ growing businesses.</p>
        </div>
      </aside>

      <section className="flex min-h-[55vh] items-center justify-center px-5 py-10 sm:px-8 lg:min-h-screen lg:px-12">
        <div className="w-full max-w-xl">{children}</div>
      </section>
    </main>
  );
}

