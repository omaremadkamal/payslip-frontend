"use client";

import React from "react";

interface GoogleSignInButtonProps {
  onClick?: () => void;
}

export default function GoogleSignInButton({
  onClick,
}: GoogleSignInButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{ maxWidth: "100%" }}
      className="flex items-center justify-center gap-3 w-full max-w-md px-6 py-3 bg-white text-gray-800 font-medium border border-[#E85D24] rounded-full transition-all duration-200 hover:bg-orange-50 active:scale-95"
    >
      <img src="googleicon.svg" alt="Google" className="w-5 h-5" />
      <span>Sign in with Google</span>
    </button>
  );
}
