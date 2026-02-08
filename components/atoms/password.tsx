"use client";
import Link from "next/link";
import React, { useState } from "react";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PasswordField = ({
  labelname,
  showResetPassword,
  showError,
}: {
  labelname: string;
  showResetPassword: boolean;
  showError?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-[440px] max-w-full flex flex-col font-sans">
      <div className="flex justify-between items-center mb-2">
        <label className="text-[#1A1C1E] text-[20px] font-bold">
          {labelname}
        </label>
        {showResetPassword && (
          <Link
            href="/forgot-password"
            className="text-sm font-bold text-[#E35E14] hover:underline"
          >
            Forgot Password?
          </Link>
        )}
      </div>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="......."
          className="w-full h-[48px] h-[48px] top-[14px] right-[17px] bottom-[14px] left-[17px] px-6 pr-14 border border-[#D1D5DB] rounded-[16px]  text-[#6B7280] text-[18px] outline-none box-border focus:border-blue-500 focus:ring-1"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1A1C1E] transition-colors cursor-pointer"
        >
          {showPassword ? (
            <IoEyeOffOutline size={25} />
          ) : (
            <IoEyeOutline size={25} />
          )}
        </button>
      </div>
      {showError && <p>Must be at least 8 characters.</p>}
    </div>
  );
};

export default PasswordField;
