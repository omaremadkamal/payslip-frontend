import React from "react";
import SignInButton from "@/components/atoms/button";
import SideNavItem from "@/components/molecules/sideNavItem/sideNavItem";
export default function companyProfile() {
  return (
    <div>
      <nav>
        <div className="w-full h-[70px]  pr-[8px] pl-[8px] gap-2 flex items-center border-b border-[#1B262C] h-[1px]">
          <h3 className=" text-[#D85B00] w-[86px] h-[17px]  font-sans font-medium text-[14px] leading-none tracking-normal align-middle">
            Payroll SLips
          </h3>
          <h3 className="w-[190px] h-[19px] font-sans font-medium text-base leading-none tracking-normal align-middle">
            {" "}
            /dliver.io/cairo branch
          </h3>
          <div className=" ml-auto w-[90px] h-[44px] p-[10px] gap-[10px] flex items-center ">
            <h3>Help</h3>
            <img src="help_.svg" alt="icons" />
          </div>
        </div>
      </nav>
      <div className="flex  ">
        <SideNavItem />
        <div className=" flex-row pt-[30px] pl-[124px] pr-[0] ">
          <h1 className="font-bold text-[24px] leading-[32px] tracking-[0%] text-[#111827] align-middle w-[192px] h-[32px] ">
            CompanyProfile
          </h1>
          <p className="font-normal text-[16px] leading-[24px] tracking-[0%] text-[#6B7280] align-middle ">
            Manage your organization's legal information and branding.
          </p>

          <div className="">
            <div className=" flex    ">
              <span>
                <h1 className="font-bold text-[17px] leading-[28px] text-[#111827] align-middle w-[172px] h-[28px]">
                  Organization Details
                </h1>
                <p className="font-normal text-[14px] leading-[20px] tracking-[0%] text-[#6B7280] align-middle">
                  Essential legal and identification data.
                </p>
              </span>
              <div className="w-[129px] h-[34px] text-[14px]">
                <SignInButton text={"Save Changes"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
