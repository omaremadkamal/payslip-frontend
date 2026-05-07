const RememberMe = ({ text }: { text: string }) => {
  return (
    <div className="w-[440px] max-w-full h-[20px] flex items-center gap-[8px] font-sans">
      <input
        type="checkbox"
        id="remember"
        className="w-[16px] h-[16px] cursor-pointer border-[#D1D5DB] rounded-[4px]"
      />

      <label
        htmlFor="remember"
        className="text-[#4B5563] text-[14px]  font-medium cursor-pointer"
      >
        {text}
      </label>
    </div>
  );
};

export default RememberMe;
