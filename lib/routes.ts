export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  // CHANGE [B-07 / RP-1]: New route entry for the reset-password page.
  // WHY: The page didn't exist before; the email link from the backend points at this path.
  // IMPACT IF LEFT: The legacy stub has no target to redirect to and the email link is dead.
  resetPassword: "/reset-password",
  createOrganization: "/create-organization",
  organizationBranding: "/organization-branding",
  communicationSettings: "/communication-settings",
  profileCompleted: "/profile-completed",
  dashboard: "/dashboard",
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
  helpCenter: "/help-center",
} as const;

export const LEGACY_ROUTE_REDIRECTS = {
  "/forgetpassword": ROUTES.forgotPassword,
  "/CreateNewOrganization": ROUTES.createOrganization,
  "/organization": ROUTES.organizationBranding,
  "/CommunicationSettings": ROUTES.communicationSettings,
  "/profileCompleted": ROUTES.profileCompleted,
} as const;

