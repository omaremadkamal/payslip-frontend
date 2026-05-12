export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--app-surface)] px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--brand-100)] border-t-[var(--brand-500)]" />
        <div>
          <p className="text-lg font-semibold text-slate-900">Preparing your workspace</p>
          <p className="text-sm text-slate-500">Loading mock account and onboarding state.</p>
        </div>
      </div>
    </div>
  );
}

