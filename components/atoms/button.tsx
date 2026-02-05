const SignInButton = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="w-[440px] max-w-full h-[60px] bg-[#FB7200] hover:bg-[#c44e0f] text-white text-[18px] font-bold rounded-[16px] transition-all cursor-pointer shadow-md active:scale-[0.98]"
    >
      {text}
    </button>
  );
};

export default SignInButton;
