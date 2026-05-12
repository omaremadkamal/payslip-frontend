export const SESSION_COOKIE_NAME = "payslip_session";
export const ONBOARDING_COOKIE_NAME = "payslip_onboarding";

const USERS_STORAGE_KEY = "payslip_mock_users";
const SESSION_STORAGE_KEY = "payslip_mock_session";
const ONBOARDING_STORAGE_KEY = "payslip_mock_onboarding";

export const DEMO_CREDENTIALS = {
  email: "admin@payrollslips.test",
  password: "Payroll123!",
} as const;

export type CompanyDetails = {
  companyName: string;
  commercialRegistrationNumber: string;
  taxIdNumber: string;
  defaultCurrency: string;
  exchangeRate: string;
};

export type BrandingDetails = {
  brandColor: string;
  logoName: string;
};

export type CommunicationDetails = {
  senderName: string;
  senderTitle: string;
  senderDepartment: string;
  host: string;
  port: string;
  security: string;
  senderEmail: string;
  senderPassword: string;
};

export type OnboardingDraft = {
  companyDetails: CompanyDetails;
  branding: BrandingDetails;
  communication: CommunicationDetails;
};

export type StoredUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  onboardingComplete: boolean;
  onboarding: OnboardingDraft;
  createdAt: string;
};

export type SessionUser = Omit<StoredUser, "password">;

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

export const dashboardMetrics = [
  { label: "Active employees", value: "58" },
  { label: "Pending payroll runs", value: "2" },
  { label: "Compliance checks", value: "12" },
  { label: "Unread alerts", value: "4" },
] as const;

export const dashboardActivity = [
  "Payroll draft for May 2026 saved at 10:15 AM.",
  "Social insurance update imported for Cairo branch.",
  "Reminder queued for monthly tax filing review.",
] as const;

export function createEmptyOnboardingDraft(): OnboardingDraft {
  return {
    companyDetails: {
      companyName: "",
      commercialRegistrationNumber: "",
      taxIdNumber: "",
      defaultCurrency: "Egyptian Pound (EGP)",
      exchangeRate: "1",
    },
    branding: {
      brandColor: "#F97316",
      logoName: "",
    },
    communication: {
      senderName: "HR Team",
      senderTitle: "HR Manager",
      senderDepartment: "Human Resources",
      host: "smtp.office365.com",
      port: "587",
      security: "TLS",
      senderEmail: "hr@payrollslips.test",
      senderPassword: "DemoMail123!",
    },
  };
}

function createDemoUser(): StoredUser {
  return {
    id: "demo-admin",
    firstName: "Omar",
    lastName: "Admin",
    email: DEMO_CREDENTIALS.email,
    password: DEMO_CREDENTIALS.password,
    onboardingComplete: true,
    onboarding: {
      companyDetails: {
        companyName: "Payroll Slips",
        commercialRegistrationNumber: "12345678",
        taxIdNumber: "987-654-321",
        defaultCurrency: "Egyptian Pound (EGP)",
        exchangeRate: "1",
      },
      branding: {
        brandColor: "#F97316",
        logoName: "payroll-slips-mark.svg",
      },
      communication: {
        senderName: "Payroll Operations",
        senderTitle: "HR Manager",
        senderDepartment: "People Operations",
        host: "smtp.office365.com",
        port: "587",
        security: "TLS",
        senderEmail: "ops@payrollslips.test",
        senderPassword: "DemoMail123!",
      },
    },
    createdAt: new Date().toISOString(),
  };
}

function isBrowser() {
  return typeof window !== "undefined";
}

function wait(ms = 450) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function setCookie(name: string, value: string, maxAgeSeconds?: number) {
  if (!isBrowser()) {
    return;
  }

  const maxAge = maxAgeSeconds ? `; max-age=${maxAgeSeconds}` : "";
  document.cookie = `${name}=${value}; path=/${maxAge}; samesite=lax`;
}

function clearCookie(name: string) {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

function sanitizeUser(user: StoredUser): SessionUser {
  const sessionUser = { ...user };
  delete (sessionUser as Partial<StoredUser>).password;
  return sessionUser as SessionUser;
}

function seedUsers(users: StoredUser[]): StoredUser[] {
  const hasDemoUser = users.some((user) => user.email === DEMO_CREDENTIALS.email);

  if (hasDemoUser) {
    return users;
  }

  return [createDemoUser(), ...users];
}

function readUsers(): StoredUser[] {
  const users = readStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
  const seededUsers = seedUsers(users);

  if (seededUsers.length !== users.length) {
    writeStorage(USERS_STORAGE_KEY, seededUsers);
  }

  return seededUsers;
}

function writeUsers(users: StoredUser[]) {
  writeStorage(USERS_STORAGE_KEY, users);
}

function writeSession(user: SessionUser | null, remember: boolean) {
  if (user) {
    writeStorage(SESSION_STORAGE_KEY, user);
    setCookie(SESSION_COOKIE_NAME, user.id, remember ? 60 * 60 * 24 * 30 : undefined);
    setCookie(
      ONBOARDING_COOKIE_NAME,
      user.onboardingComplete ? "complete" : "pending",
      remember ? 60 * 60 * 24 * 30 : undefined,
    );
    return;
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY);
  clearCookie(SESSION_COOKIE_NAME);
  clearCookie(ONBOARDING_COOKIE_NAME);
}

function writeOnboardingDraft(userId: string, draft: OnboardingDraft) {
  const allDrafts = readStorage<Record<string, OnboardingDraft>>(ONBOARDING_STORAGE_KEY, {});
  allDrafts[userId] = draft;
  writeStorage(ONBOARDING_STORAGE_KEY, allDrafts);
}

function readOnboardingDraft(userId: string, fallback: OnboardingDraft): OnboardingDraft {
  const allDrafts = readStorage<Record<string, OnboardingDraft>>(ONBOARDING_STORAGE_KEY, {});
  return allDrafts[userId] ?? fallback;
}

export function initializeMockAuth() {
  if (!isBrowser()) {
    return;
  }

  readUsers();
}

export function getStoredSession(): SessionUser | null {
  return readStorage<SessionUser | null>(SESSION_STORAGE_KEY, null);
}

export function getStoredOnboarding(userId?: string) {
  if (!userId) {
    return createEmptyOnboardingDraft();
  }

  const matchedUser = readUsers().find((user) => user.id === userId);
  return readOnboardingDraft(userId, matchedUser?.onboarding ?? createEmptyOnboardingDraft());
}

export async function signInWithMock(payload: SignInPayload) {
  initializeMockAuth();
  await wait();

  const matchedUser = readUsers().find(
    (user) =>
      user.email.toLowerCase() === payload.email.trim().toLowerCase() &&
      user.password === payload.password,
  );

  if (!matchedUser) {
    throw new Error("Invalid email or password.");
  }

  const sessionUser = sanitizeUser(matchedUser);
  writeSession(sessionUser, payload.remember);
  writeOnboardingDraft(sessionUser.id, matchedUser.onboarding);

  return {
    user: sessionUser,
    onboarding: matchedUser.onboarding,
  };
}

export async function signUpWithMock(payload: SignUpPayload) {
  initializeMockAuth();
  await wait();

  const users = readUsers();
  const email = payload.email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === email)) {
    throw new Error("An account with that email already exists.");
  }

  const nextUser: StoredUser = {
    id: crypto.randomUUID(),
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    email,
    password: payload.password,
    onboardingComplete: false,
    onboarding: createEmptyOnboardingDraft(),
    createdAt: new Date().toISOString(),
  };

  writeUsers([nextUser, ...users]);

  const sessionUser = sanitizeUser(nextUser);
  writeSession(sessionUser, true);
  writeOnboardingDraft(sessionUser.id, nextUser.onboarding);

  return {
    user: sessionUser,
    onboarding: nextUser.onboarding,
  };
}

export function saveOnboardingDraft(userId: string, nextDraft: OnboardingDraft) {
  const users = readUsers();
  const nextUsers = users.map((user) =>
    user.id === userId
      ? {
          ...user,
          onboarding: nextDraft,
        }
      : user,
  );

  writeUsers(nextUsers);
  writeOnboardingDraft(userId, nextDraft);

  const currentSession = getStoredSession();
  if (currentSession?.id === userId) {
    writeSession(
      {
        ...currentSession,
        onboarding: nextDraft,
      },
      true,
    );
  }

  return nextDraft;
}

export function completeOnboarding(userId: string, nextDraft: OnboardingDraft) {
  const users = readUsers();
  let nextSession: SessionUser | null = null;

  const nextUsers = users.map((user) => {
    if (user.id !== userId) {
      return user;
    }

    const completedUser = {
      ...user,
      onboardingComplete: true,
      onboarding: nextDraft,
    };

    nextSession = sanitizeUser(completedUser);
    return completedUser;
  });

  writeUsers(nextUsers);
  writeOnboardingDraft(userId, nextDraft);
  writeSession(nextSession, true);

  return {
    user: nextSession,
    onboarding: nextDraft,
  };
}

export function signOutFromMock() {
  writeSession(null, false);
}
