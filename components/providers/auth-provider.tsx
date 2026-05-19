"use client";

// CHANGE [B-12]: Replaced the mock-auth provider with one that talks to the real backend.
// WHY: The previous implementation never spoke to the backend; login/signup were localStorage simulations.
// IMPACT IF LEFT: No real authentication occurs; every protected endpoint returns 401 because no token is ever issued.

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  api,
  ApiError,
  getStoredAccessToken,
  setSessionCookies,
  setStoredTokens,
} from "@/lib/api-client";

// --- Types ------------------------------------------------------------------
// Field names here mirror the backend DTOs (Lamis's class-validator decorators).
// Numeric fields are typed as `number` because @IsNumber()/@IsInt() reject string forms.

// CHANGE [B-08]: Renamed CompanyDetails fields to match CreateOrganizationDto.
// WHY: Backend ValidationPipe strips unknown keys (whitelist:true) and @IsNumber rejects string types.
// IMPACT IF LEFT: Sending commercialRegistrationNumber or exchangeRate produces a 400 with the required fields missing.
export type CompanyDetails = {
  companyName: string;
  commercialRegNumber: string;
  taxIdNumber: string;
  defaultCurrency: string;
  currencyExchangeRate: number;
};

export type BrandingDetails = {
  brandColor: string;
  logoName: string;
};

// CHANGE [B-11]: Renamed Communication fields (host/port/security → smtpHost/smtpPort/smtpSecurity).
// WHY: Backend's CreateCommunicationSettingsDto declares those exact field names; smtpPort is @IsNumber, smtpSecurity is @IsEnum(SMTP_SECURITY).
// IMPACT IF LEFT: The old names are stripped by the ValidationPipe and the request 400s.
export type CommunicationDetails = {
  senderName: string;
  senderTitle: string;
  senderDepartment: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecurity: "TLS" | "SSL" | "NONE";
  senderEmail: string;
  senderPassword: string;
};

// CHANGE [B-10]: Added organizationId to the draft so step 2 (branding) can target the org created in step 1.
// WHY: PATCH /organizations/:id needs the id returned from POST /organizations.
// IMPACT IF LEFT: The branding step has no way to know which organisation it's updating.
export type OnboardingDraft = {
  organizationId: string | null;
  companyDetails: CompanyDetails;
  branding: BrandingDetails;
  communication: CommunicationDetails;
};

export type SessionUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  onboardingComplete: boolean;
};

export type SignInPayload = {
  email: string;
  password: string;
  remember: boolean;
};

export type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// --- Local storage keys -----------------------------------------------------

const SESSION_USER_KEY = "payslip_session_user";
const ONBOARDING_DRAFT_KEY = "payslip_onboarding_draft";

// --- Defaults ---------------------------------------------------------------

// CHANGE [B-08, B-10, B-11]: Default draft uses renamed fields, numeric defaults, and starts with no org id.
// WHY: Field names + types must match backend DTOs from the very first render so TextField initial state aligns.
// IMPACT IF LEFT: Form starts in an inconsistent state and submits the wrong keys.
export function createEmptyOnboardingDraft(): OnboardingDraft {
  return {
    organizationId: null,
    companyDetails: {
      companyName: "",
      commercialRegNumber: "",
      taxIdNumber: "",
      defaultCurrency: "Egyptian Pound (EGP)",
      currencyExchangeRate: 1,
    },
    branding: {
      brandColor: "#F97316",
      logoName: "",
    },
    communication: {
      senderName: "HR Team",
      senderTitle: "HR Manager",
      senderDepartment: "Human Resources",
      smtpHost: "smtp.office365.com",
      smtpPort: 587,
      smtpSecurity: "TLS",
      senderEmail: "hr@payrollslips.test",
      senderPassword: "",
    },
  };
}

// --- Storage helpers --------------------------------------------------------

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T | null) {
  if (typeof window === "undefined") return;
  if (value === null) {
    window.localStorage.removeItem(key);
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

// --- Backend response shapes ------------------------------------------------

type AuthResponse = {
  message: string;
  user: {
    id: string;
    role: string;
    firstName: string;
    lastName?: string;
    email: string;
    onboardingComplete: boolean;
  };
  accessToken: string;
  refreshToken: string;
};

type MeResponse = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: string;
  organizationId: string | null;
};

function toSessionUserFromAuth(user: AuthResponse["user"]): SessionUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName ?? "",
    email: user.email,
    role: user.role,
    onboardingComplete: !!user.onboardingComplete,
  };
}

function toSessionUserFromMe(me: MeResponse): SessionUser {
  return {
    id: me.id,
    firstName: me.firstName,
    lastName: me.lastName ?? "",
    email: me.email,
    role: me.role,
    onboardingComplete: me.organizationId !== null,
  };
}

// --- Context ----------------------------------------------------------------

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
  const [onboarding, setOnboarding] = useState<OnboardingDraft>(
    createEmptyOnboardingDraft(),
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const storedUser = readJson<SessionUser | null>(SESSION_USER_KEY, null);
      const storedDraft = readJson<OnboardingDraft>(
        ONBOARDING_DRAFT_KEY,
        createEmptyOnboardingDraft(),
      );

      if (storedUser) setUser(storedUser);
      setOnboarding(storedDraft);

      const token = getStoredAccessToken();
      if (token) {
        try {
          const me = (await api.get("/auth/me")) as MeResponse;
          if (cancelled) return;
          const refreshed = toSessionUserFromMe(me);
          setUser(refreshed);
          writeJson(SESSION_USER_KEY, refreshed);
          setSessionCookies(refreshed.id, refreshed.onboardingComplete, true);
        } catch (err) {
          if (cancelled) return;
          if (err instanceof ApiError && err.status === 401) {
            setUser(null);
            writeJson(SESSION_USER_KEY, null);
            setStoredTokens(null, null);
            setSessionCookies(null, false, false);
          }
        }
      }

      if (!cancelled) setIsReady(true);
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      onboarding,
      isReady,
      async signIn(payload) {
        // CHANGE [B-01]: Only send { email, password }; `remember` stays client-side.
        // WHY: Backend ValidationPipe has forbidNonWhitelisted: true; LoginDto only accepts email + password.
        // IMPACT IF LEFT: Login returns 400 before credentials are checked.
        const res = (await api.post("/auth/login", {
          email: payload.email,
          password: payload.password,
        })) as AuthResponse;
        setStoredTokens(res.accessToken, res.refreshToken);
        const sessionUser = toSessionUserFromAuth(res.user);
        setUser(sessionUser);
        writeJson(SESSION_USER_KEY, sessionUser);
        setSessionCookies(sessionUser.id, sessionUser.onboardingComplete, payload.remember);
        return sessionUser;
      },
      async signUp(payload) {
        const res = (await api.post("/auth/register", payload)) as AuthResponse;
        setStoredTokens(res.accessToken, res.refreshToken);
        const sessionUser = toSessionUserFromAuth(res.user);
        setUser(sessionUser);
        writeJson(SESSION_USER_KEY, sessionUser);
        setSessionCookies(sessionUser.id, sessionUser.onboardingComplete, true);
        const freshDraft = createEmptyOnboardingDraft();
        setOnboarding(freshDraft);
        writeJson(ONBOARDING_DRAFT_KEY, freshDraft);
        return sessionUser;
      },
      signOut() {
        setStoredTokens(null, null);
        setSessionCookies(null, false, false);
        writeJson(SESSION_USER_KEY, null);
        writeJson(ONBOARDING_DRAFT_KEY, null);
        setUser(null);
        setOnboarding(createEmptyOnboardingDraft());
      },
      saveDraft(draft) {
        setOnboarding(draft);
        writeJson(ONBOARDING_DRAFT_KEY, draft);
      },
      async finalizeOnboarding(draft) {
        setOnboarding(draft);
        writeJson(ONBOARDING_DRAFT_KEY, draft);
        if (!user) return null;
        // After the last onboarding step has posted its data, /me reflects the new organisation.
        // We refresh the session from the server so onboardingComplete is authoritative.
        try {
          const me = (await api.get("/auth/me")) as MeResponse;
          const refreshed = toSessionUserFromMe(me);
          setUser(refreshed);
          writeJson(SESSION_USER_KEY, refreshed);
          setSessionCookies(refreshed.id, refreshed.onboardingComplete, true);
          return refreshed;
        } catch {
          return user;
        }
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
