export const EmailField = ({ text }: { text: string }) => {
  return (
    <div className="w-[440px] max-w-full flex flex-col">
      <label className="block text-[#1A1C1E] text-[20px] font-bold mb-[10px]">
        {text}
      </label>
      <input
        type="email"
        placeholder="e.g.name@company.com"
        className="w-full h-[50px] px-6 border border-[#D1D5DB] rounded-[16px] text-[#6B7280] text-[18px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm box-border"
      />
    </div>
  );
};

export default EmailField;
