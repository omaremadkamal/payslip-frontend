export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
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

