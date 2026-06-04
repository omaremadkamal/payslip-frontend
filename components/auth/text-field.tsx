import { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
  trailingClassName?: string;
};

export function TextField({
  className = "",
  error,
  hint,
  label,
  trailing,
  trailingClassName = "",
  ...props
}: TextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
      {label ? <label htmlFor={props.id}>{label}</label> : null}
      <div className="relative">
        <input
          {...props}
          className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[var(--brand-300)] focus:ring-4 focus:ring-[var(--brand-100)] ${trailing ? "pr-12" : ""} ${className}`}
        />
        {trailing ? (
          <span
            className={`absolute inset-y-0 right-4 flex items-center ${trailingClassName}`}
          >
            {trailing}
          </span>
        ) : null}
      </div>
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
      {!error && hint ? (
        <span className="text-sm text-slate-500">{hint}</span>
      ) : null}
    </div>
  );
}
