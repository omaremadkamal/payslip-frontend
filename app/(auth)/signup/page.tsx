import SignInButton from "@/components/atoms/button";
import { GeneralInput } from "@/components/atoms/inputAtom";
import PasswordField from "@/components/atoms/password";
import SignUpText from "@/components/atoms/signuptext";
import EmailField from "@/components/atoms/textatom";
import RememberMe from "@/components/atoms/rememberme";
import FooterLabels from "@/components/atoms/footer";

export default function Page() {
  return (
    <main className="flex flex-row min-h-screen w-full ">
      <form className="bg-[#FB7200] flex flex-col w-1/2  p-8 md:p-12 text-white justify-between ">
        <div className=" md:text-2xl  font-sans">Payroll Slips</div>
        <div className="font-euclid A  font-bold text-5xl  tw-leading-[60px]">
          <h1 className=" md:text-5xl font-Euclid Circular A mb-4 leading-tight">
            100% Payroll
            <br />
            Compliance with
            <br />
            Egyptian Tax & Social
            <br />
            Insurance Laws.
          </h1>
          <div className="w-438.22px h-49px t-497px l-48px">
            <p className="text-sm md:text-lg opacity-90 font-Euclid Circular A">
              Automate salaries, taxes, and social insurance with guaranteed
              accuracy. Our dynamic engine updates instantly with the latest
              Egyptian regulations—no errors, no manual work.
            </p>
          </div>
        </div>
        <div className="text-xs md:text-sm opacity-80">
          Trusted by 5,000+ growing businesses.
        </div>
      </form>

      <form className="min-h-screen w-1/2 justify-center flex flex-col items-center justify-center ">
        <div className="w-[448px] h-[550px] gap-[18px] ">
          <div className=" w-[448px] h-[68px] gap-8px">
            <h1 className=" w-[448px] h-[36px] leading-[30px] text-[30px] font-bold text-[#1A1C1E] align-middle">
              Create an account{" "}
            </h1>
            <p className="text-[#6B7280]  w-[448px] h-[24px]  font-normal text-[16px] leading-[24px] align-middle">
              Start managing your organization's payroll today.
            </p>
          </div>

          <div className="w-[448px] h-[420px] gap-[20px]">
            <div className=" w-[448px] h-[74px] gap-[4px]">
              <GeneralInput
                placeholder="e.g.John Doe"
                type="text"
                labelname="Admin Full Name"
              ></GeneralInput>
            </div>
            <div className="w-[448px] h-[74px] gap-[4px]">
              <GeneralInput
                placeholder="please enter your email"
                type="email"
                labelname="Work Email"
              ></GeneralInput>
            </div>
            <div className=" w-[448px] h-[94px] gap-4px">
              <PasswordField
                showResetPassword={false}
                labelname="Password"
                showError={true}
              />
            </div>
            <div className=" w-[448px] h-[94px] gap-4px">
              <PasswordField
                showResetPassword={false}
                labelname="Confirm Password"
                showError={true}
              />
            </div>
            <div className="w-[448px] h-[30px] gap-8px">
              <RememberMe text="I agree to the Terms of Service and Privacy Policy" />
            </div>
            <div className="">
              <SignInButton text={"Create Account"} />
            </div>
          </div>
          <div className="w-[448px] h-[48px] gap-[12px] ">
            <div className="flex flex-col  ">
              <SignUpText />
            </div>
            <div className="flex justify-center">
              <FooterLabels />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
