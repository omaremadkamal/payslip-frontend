"use client";
import React, { useRef, useState } from "react";

interface Props {
  onFileSelect: (file: File | null) => void;
}

const LogoUpload = ({ onFileSelect }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target?.result as string);
      reader.readAsDataURL(file);
    }
    onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-slate-700">
        Organization Logo
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 rounded-xl h-[160px] flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer overflow-hidden transition-all group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <div className="text-center">
            <p className="text-orange-600 font-bold text-sm">Upload a file</p>
            <p className="text-slate-400 text-[11px] mt-1">
              PNG, JPG up to 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoUpload;
