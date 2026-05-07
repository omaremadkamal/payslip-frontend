import React from "react";
import PasswordField from "@/components/atoms/password";
import SignInButton from "@/components/atoms/button";
import SideNavitem from "@/components/molecules/sideNavItem/sideNavItem";
export default function resetpasswordpage() {
  return (
    <div className="w-full h-full ">
      <nav>
        <div className="w-full h-[70px]  pr-[8px] pl-[8px] gap-2 flex items-center border-b border-[#1B262C] h-[1px]">
          <h3 className=" text-[#D85B00] w-[86px] h-[17px]  font-sans font-medium text-[14px] leading-none tracking-normal align-middle">
            Payroll SLips
          </h3>
          <h3 className="w-[190px] h-[19px] font-sans font-medium text-base leading-none tracking-normal align-middle">
            {" "}
            /Setting/Reset Password
          </h3>
          <div className=" ml-auto w-[90px] h-[44px] p-[10px] gap-[10px] flex items-center ">
            <h3>Help</h3>
            <img src="/iconstack.io.svg" alt="icons" />
          </div>
        </div>
      </nav>

      <div className=" w-[100%] max-h-full flex">
        <div className=" border-[#1B262c]">
          <SideNavitem />
        </div>
        <div className="flex justify-center w-full mt-[30px] ">
          <form
            className="w-[480px]   
             rounded-[12px] bg-[#FFFFFF] border-[#F3F4F6] border-[1px]  gap-18px shadow-[0_12px_15px_-10px_rgba(0,0,0,0.1),0_25px_30px_-15px_rgba(0,0,0,0.2)]"
          >
            <div className="w-[414px] h-[30px] flex items-center justify-center">
              <h1 className="font-bold text-[24px] leading-[30px]  text-center ">
                Reset Password
              </h1>
            </div>
            <div className="w-[389.25px] h-[37px] flex items-center justify-center mt-[18px] ">
              <p className=" font-normal text-[14px] leading-[20px] text-center text-[#4B5563] gap-[18px]  ">
                Please enter your new password below to regain access to your HR
                portal.
              </p>
            </div>
            <div className=" w-[440px] h-[76px] gap-[18px] mt-[18px]">
              <PasswordField
                showResetPassword={false}
                labelname="Enter Your Old Password"
                showError={false}
              />
            </div>
            <div>
              <div className=" w-[440px] h-[76px]">
                <PasswordField
                  showResetPassword={false}
                  labelname="New Password"
                  showError={false}
                />
              </div>

              <div className="w-[440px] p-2 bg-[#F9FAFB] rounded-xl font-sans">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[#1F2937] font-semibold text-sm">
                    Password Strength:{" "}
                    <span className="text-[#F97316]">Medium</span>
                  </p>
                  <span className="text-[#6B7280] font-bold text-sm">65%</span>
                </div>

                <div className="w-full bg-[#E5E7EB] h-[8px] rounded-full overflow-hidden">
                  <div
                    className="bg-[#F97316] h-full rounded-full transition-all duration-300"
                    style={{ width: "65%" }}
                  ></div>
                </div>

                <p className="text-[#6B7280] text-sm mt-4">
                  Use at least 8 characters, a number, and a special symbol.
                </p>
              </div>

              <div className=" w-[440px] h-[76px]">
                <PasswordField
                  showResetPassword={false}
                  labelname="Confirm New Password"
                  showError={false}
                />
              </div>

              <div className=" h-[56px] mt-[10px]">
                <SignInButton text={"Reset Password"} />
              </div>
              <div
                className="flex flex-row align-center justify-center w-[414px] 
              h-[22px] "
              >
                <img src="iconn.svg" alt="icon" />
                <p className="text-[#FB7200]">Back to Settings</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
