export default function ProfileCompleted() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Success Card */}
      <div
        className="bg-white rounded-[16px] w-full flex flex-col items-center justify-center text-center p-8 transition-all"
        style={{
          maxWidth: "512px",
          minHeight: "386px",
          boxShadow:
            "0 8px 10px -6px rgba(0,0,0,0.1), 0 25px 50px -12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Success Icon (Checkmark) */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Text Content */}
        <h1 className="text-[32px] font-bold text-gray-900 mb-4">
          Profile Completed!
        </h1>

        <p
          className="text-[#6B7280] leading-[28px] max-w-[421px] mb-10"
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "18px",
            fontWeight: "400",
          }}
        >
          Welcome aboard. Your account has been successfully created. You can
          now access your dashboard.
        </p>

        {/* Action Button */}
        <button className="group flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold py-4 px-10 rounded-xl w-full sm:w-auto transition-all active:scale-95 cursor-pointer">
          Go to Dashboard
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
