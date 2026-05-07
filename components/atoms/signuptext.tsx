import Link from "next/link";

const SignUpText = () => {
  return (
    <div className="w-110 max-w-full h-5 pt-2  flex items-center justify-center font-sans">
      <p className="text-[#4B5563] text-[16px] font-normal">
        Already have an account?{" "}
        <Link
          href="/signup"
          className="text-[#E35E14] font-bold hover:underline ml-1"
        >
          Sign Up Now
        </Link>
      </p>
    </div>
  );
};

export default SignUpText;
