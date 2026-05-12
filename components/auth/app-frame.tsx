import { ReactNode } from "react";

type AppFrameProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AppFrame({ actions, children, description, title }: AppFrameProps) {
  return (
    <main className="min-h-screen bg-[var(--app-surface)] px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-[28px] bg-white/80 px-6 py-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.35)] backdrop-blur sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--brand-500)]">
              Payroll Slips
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">{description}</p>
          </div>
          {actions ? <div className="w-full max-w-sm lg:w-auto">{actions}</div> : null}
        </header>
        <section className="mt-6">{children}</section>
      </div>
    </main>
  );
}
