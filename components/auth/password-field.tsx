"use client";

import { ReactNode, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TextField } from "@/components/auth/text-field";

type PasswordFieldProps = {
  id: string;
  label: string;
  labelAction?: ReactNode;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
};

export function PasswordField({
  error,
  hint,
  id,
  label,
  labelAction,
  onChange,
  placeholder = "Enter your password",
  value,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-slate-700" htmlFor={id}>
          {label}
        </label>
        {labelAction}
      </div>
      <div className="relative">
        <TextField
          autoComplete="current-password"
          error={error}
          hint={hint}
          id={id}
          label=""
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          trailing={
            <button
              aria-label={isVisible ? "Hide password" : "Show password"}
              className="cursor-pointer text-slate-400 transition hover:text-slate-700"
              onClick={() => setIsVisible((current) => !current)}
              type="button"
            >
              {isVisible ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
          }
          trailingClassName="pointer-events-auto"
          type={isVisible ? "text" : "password"}
          value={value}
        />
      </div>
    </div>
  );
}
