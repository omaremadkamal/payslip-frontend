"use client";
import React from "react";

interface Props {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-slate-700">
        Brand Color
      </label>
      <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white focus-within:ring-2 focus-within:ring-orange-500/20">
        <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded border border-black/5">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-2 w-14 h-14 cursor-pointer p-0 border-none"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 outline-none font-mono text-slate-600 font-bold uppercase text-sm"
        />
      </div>
      <p className="text-slate-400 text-xs">
        Pick a primary color for your dashboard.
      </p>
    </div>
  );
};

export default ColorPicker;
