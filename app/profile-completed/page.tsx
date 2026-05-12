"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/auth/button";
import { LoadingScreen } from "@/components/auth/loading-screen";
import { useAuth } from "@/components/providers/auth-provider";
import { ROUTES } from "@/lib/routes";

export default function ProfileCompletedPage() {
  const router = useRouter();
  const { isReady, user } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!user) {
      router.replace(ROUTES.login);
    }
  }, [isReady, router, user]);

  if (!isReady || !user) {
    return <LoadingScreen />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--app-surface)] px-5 py-10 sm:px-8">
      <div className="w-full max-w-2xl rounded-[32px] bg-white px-8 py-12 text-center shadow-[0_35px_90px_-52px_rgba(15,23,42,0.38)] sm:px-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-5xl text-emerald-600">
          ✓
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-900">
          Profile Completed!
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-500">
          Welcome aboard. Your account has been successfully created and stored in the mock session. You can now access your dashboard.
        </p>
        <div className="mt-10">
          <Button className="sm:w-auto sm:px-10" onClick={() => router.push(ROUTES.dashboard)} type="button">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}

