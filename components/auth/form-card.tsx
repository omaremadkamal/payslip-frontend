import { ReactNode } from "react";

type FormCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function FormCard({ children, description, title }: FormCardProps) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.35)] sm:p-8 md:p-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-500">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

