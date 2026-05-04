"use client";

import React, { useState } from "react";
import LogoUpload from "./components_/LogoUpload";
import ColorPicker from "./components_/ColorPicker";

const Organization = () => {
  const [brandColor, setBrandColor] = useState("#F97316");
  const [logo, setLogo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا كل البيانات جاهزة للإرسال
    console.log("Submit Data:", { brandColor, logo });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-[720px]">
        {/* العناوين خارج الفورم لأنها Header للصفحة */}
        <header className="mb-8">
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight">
            Create New Organization
          </h1>
          <p className="text-slate-500 mt-2">
            Enter your company details to set up a new payroll workspace.
          </p>
        </header>

        {/* كل شيء الآن داخل الـ Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-[12px] p-6 md:p-[33px] shadow-sm"
        >
          {/* شبكة المدخلات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <LogoUpload onFileSelect={setLogo} />
            <ColorPicker value={brandColor} onChange={setBrandColor} />
          </div>

          {/* الأزرار داخل الفورم مباشرة - Action Area */}
          <div className="mt-10 pt-6 border-t border-slate-50 flex justify-end gap-3">
            <button
              type="button"
              className="px-8 py-2.5 rounded-[8px] border border-slate-200 font-bold text-slate-600 hover:bg-slate-300 transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              style={{ backgroundColor: brandColor }}
              className="px-8 py-2.5 rounded-[8px] text-white font-bold shadow-lg shadow-orange-200/50 hover:brightness-105 transition-all active:scale-95 cursor-pointer"
            >
              Create Organization
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Organization;
