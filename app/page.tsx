import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ONBOARDING_COOKIE_NAME, SESSION_COOKIE_NAME } from "@/lib/mock-auth";
import { ROUTES } from "@/lib/routes";

export default async function Home() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const onboardingCookie = cookieStore.get(ONBOARDING_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    redirect(ROUTES.login);
  }

  if (onboardingCookie !== "complete") {
    redirect(ROUTES.createOrganization);
  }

  redirect(ROUTES.dashboard);
}
