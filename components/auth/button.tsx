import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  className = "",
  loading = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseClassName =
    "inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold transition focus:outline-none focus:ring-4";
  const variantClassName =
    variant === "secondary"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-100"
      : "bg-[var(--brand-500)] text-white shadow-[0_18px_35px_-22px_rgba(249,115,22,0.75)] hover:bg-[var(--brand-600)] focus:ring-[var(--brand-100)]";

  return (
    <button
      {...props}
      className={`${baseClassName} ${variantClassName} ${className}`}
      disabled={loading || props.disabled}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

