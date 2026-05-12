import { ReactNode } from "react";

type CheckboxFieldProps = {
  checked: boolean;
  id: string;
  label: ReactNode;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({
  checked,
  id,
  label,
  onChange,
}: CheckboxFieldProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600" htmlFor={id}>
      <input
        checked={checked}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-[var(--brand-500)] focus:ring-[var(--brand-300)]"
        id={id}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  );
}

