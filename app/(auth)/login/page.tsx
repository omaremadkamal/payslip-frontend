import EmailField from "@/components/atoms/textatom";
import PasswordField from "@/components/atoms/password";
import RememberMe from "@/components/atoms/rememberme";
import SignInButton from "@/components/atoms/button";
import SignUpText from "@/components/atoms/signuptext";
import { GeneralInput } from "@/components/atoms/inputAtom";
import FooterLabels from "@/components/atoms/footer";
import Link from "next/link";
export default function LoginPage() {
  return (
    <main className="flex flex-row min-h-screen w-full font-sans ">
      <form className=" bg-[#FB7200] flex flex-col w-1/2  p-8 md:p-12 text-white justify-between">
        <div className=" md:text-2xl  font-sans">Payroll Slips</div>
        <div>
          <div className="   font-bold text-5xl  tw-leading-[60px]">
            <h1 className=" md:text-5xl font-Euclid Circular A mb-4 leading-tight">
              Simplify your
              <br />
              workforce management.
            </h1>
          </div>
          <div className="w-438.22px h-49px t-497px l-48px">
            <p className="text-sm md:text-lg opacity-90 font-Euclid Circular A">
              The all-in-one platform for payroll, benefits, and HR
              <br />
              compliance built for modern teams.
            </p>
          </div>
        </div>

        <div className="text-xs md:text-sm opacity-80 flex items-center gap-2">
          <img src="./test.svg" alt="arrow" className="pr" />
          Trusted by 5,000+ businesses
        </div>
      </form>

      <form className="min-h-screen flex place-items-center w-1/2 justify-center">
        <div className="gap-25px w-440px h-460px t-220.14px l  p-10 flex flex-col items-start">
          <h1 className="text-[30px] font-bold text-[#1A1C1E] mb-2">
            Sign in to your account
          </h1>
          <p className="text-[#6B7280] mb-8">
            Welcome back! Please enter your details.
          </p>

          <GeneralInput
            placeholder="e.g. name@company.com"
            type="email"
            labelname="Email Address"
          ></GeneralInput>

          <div className="mt-6 flex justify-between position-relative  ">
            <PasswordField showResetPassword={true} labelname="Password" />
          </div>

          <div className="mt-4">
            <RememberMe text=" Remember me for 30 days" />
          </div>
          <div className="mt-4">
            <SignInButton text={" Sign In"} />
          </div>
          <div className="flex flex-col gap-4">
            <SignUpText />
          </div>
          <div className="flex  items-center justify-center ">
            <FooterLabels />
          </div>
        </div>
      </form>
    </main>
  );
}
