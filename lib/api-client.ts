"use client";

// CHANGE [B-12]: Central fetch wrapper that auto-attaches Authorization: Bearer from local storage.
// WHY: Every protected page previously sent no Authorization header at all — the header has to come from somewhere shared.
// IMPACT IF LEFT: Every protected /api/v1 call from the frontend returns 401 because no bearer token is sent.

import { ONBOARDING_COOKIE_NAME, SESSION_COOKIE_NAME } from "@/lib/mock-auth";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5326/api/v1";

const ACCESS_TOKEN_KEY = "payslip_access_token";
const REFRESH_TOKEN_KEY = "payslip_refresh_token";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getStoredAccessToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setStoredTokens(
  accessToken: string | null,
  refreshToken: string | null,
) {
  if (!isBrowser()) return;
  if (accessToken) window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  else window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  if (refreshToken) window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  else window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// The legacy root page (app/page.tsx) reads SESSION_COOKIE_NAME / ONBOARDING_COOKIE_NAME
// to decide where to redirect. We keep writing those cookies for backwards compatibility.
export function setSessionCookies(
  userId: string | null,
  onboardingComplete: boolean,
  remember: boolean,
) {
  if (!isBrowser()) return;
  if (!userId) {
    document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
    document.cookie = `${ONBOARDING_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
    return;
  }
  const maxAgeSuffix = remember ? `; max-age=${60 * 60 * 24 * 30}` : "";
  document.cookie = `${SESSION_COOKIE_NAME}=${userId}; path=/${maxAgeSuffix}; samesite=lax`;
  document.cookie = `${ONBOARDING_COOKIE_NAME}=${onboardingComplete ? "complete" : "pending"}; path=/${maxAgeSuffix}; samesite=lax`;
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

type ApiInit = Omit<RequestInit, "body"> & { body?: unknown };

function extractMessage(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const message = (body as { message?: unknown }).message;
  if (typeof message === "string") return message;
  if (Array.isArray(message)) {
    return (message as unknown[])
      .filter((value): value is string => typeof value === "string")
      .join(", ");
  }
  return null;
}

async function apiFetch(path: string, options: ApiInit = {}): Promise<unknown> {
  const token = getStoredAccessToken();
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(isFormData
      ? {}
      : options.body !== undefined
        ? { "Content-Type": "application/json" }
        : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string> | undefined) ?? {}),
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: isFormData
      ? (options.body as FormData)
      : options.body !== undefined
        ? JSON.stringify(options.body)
        : undefined,
  });

  const text = await response.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      extractMessage(parsed) ?? response.statusText,
      parsed,
    );
  }

  return parsed;
}

export const api = {
  get: (path: string, init?: ApiInit) =>
    apiFetch(path, { ...init, method: "GET" }),
  post: (path: string, body?: unknown, init?: ApiInit) =>
    apiFetch(path, { ...init, method: "POST", body }),
  patch: (path: string, body?: unknown, init?: ApiInit) =>
    apiFetch(path, { ...init, method: "PATCH", body }),
  delete: (path: string, init?: ApiInit) =>
    apiFetch(path, { ...init, method: "DELETE" }),
};
