export const GeneralInput = ({
  labelname,
  type,
  placeholder,
}: {
  labelname: string;
  type: string;
  placeholder: string;
}) => {
  return (
    <div className="w-[440px]  max-w-full flex flex-col">
      <label className=" w-[448px] h-[20px] block text-[#1A1C1E] text-[14px] font-bold ">
        {labelname}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>
  );
};
