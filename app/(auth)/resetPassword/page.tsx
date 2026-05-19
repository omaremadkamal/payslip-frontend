import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";

// CHANGE [B-07 / RP-2]: Redirect to /reset-password (the real form), not /forgot-password.
// WHY: The previous redirect sent users with a reset-token link to the wrong page entirely.
// IMPACT IF LEFT: Anyone who bookmarked the legacy URL ends up back at "enter your email" instead of finishing the reset.
export default function ResetPasswordPage() {
  redirect(ROUTES.resetPassword);
}

