import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function FooterLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
      <Link className="transition hover:text-slate-600" href={ROUTES.privacyPolicy}>
        Privacy Policy
      </Link>
      <Link className="transition hover:text-slate-600" href={ROUTES.termsOfService}>
        Terms of Service
      </Link>
      <Link className="transition hover:text-slate-600" href={ROUTES.helpCenter}>
        Help Center
      </Link>
    </div>
  );
}

