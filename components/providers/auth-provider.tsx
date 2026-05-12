"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  completeOnboarding,
  createEmptyOnboardingDraft,
  getStoredOnboarding,
  getStoredSession,
  initializeMockAuth,
  OnboardingDraft,
  saveOnboardingDraft,
  SessionUser,
  signInWithMock,
  SignInPayload,
  signOutFromMock,
  signUpWithMock,
  SignUpPayload,
} from "@/lib/mock-auth";

type AuthContextValue = {
  user: SessionUser | null;
  onboarding: OnboardingDraft;
  isReady: boolean;
  signIn: (payload: SignInPayload) => Promise<SessionUser>;
  signUp: (payload: SignUpPayload) => Promise<SessionUser>;
  signOut: () => void;
  saveDraft: (draft: OnboardingDraft) => void;
  finalizeOnboarding: (draft: OnboardingDraft) => Promise<SessionUser | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingDraft>(createEmptyOnboardingDraft());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      initializeMockAuth();
      const storedUser = getStoredSession();
      setUser(storedUser);
      setOnboarding(getStoredOnboarding(storedUser?.id));
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      onboarding,
      isReady,
      async signIn(payload) {
        const result = await signInWithMock(payload);
        setUser(result.user);
        setOnboarding(result.onboarding);
        return result.user;
      },
      async signUp(payload) {
        const result = await signUpWithMock(payload);
        setUser(result.user);
        setOnboarding(result.onboarding);
        return result.user;
      },
      signOut() {
        signOutFromMock();
        setUser(null);
        setOnboarding(createEmptyOnboardingDraft());
      },
      saveDraft(draft) {
        if (!user) {
          return;
        }

        saveOnboardingDraft(user.id, draft);
        setOnboarding(draft);
      },
      async finalizeOnboarding(draft) {
        if (!user) {
          return null;
        }

        const result = completeOnboarding(user.id, draft);
        setUser(result.user);
        setOnboarding(result.onboarding);
        return result.user;
      },
    }),
    [isReady, onboarding, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
