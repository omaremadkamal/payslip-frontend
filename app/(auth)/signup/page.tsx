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

      <form className="min-h-screen flex place-items-center w-1/2 justify-center">
        <div className="gap-25px w-440px h-460px t-220.14px l  p-10 flex flex-col items-start">
          <h1 className="text-[30px] font-bold text-[#1A1C1E] mb-2">
            Sign in to your account
          </h1>
          <p className="text-[#6B7280] mb-8">
            Welcome back! Please enter your details.
          </p>
          <div>
            <GeneralInput
              placeholder="e.g. John Doe"
              type="text"
              labelname="Admin Full Name"
            ></GeneralInput>
          </div>
          <div className="mt-6">
            <GeneralInput
              placeholder="please enter your email"
              type="email"
              labelname="Email Adress"
            ></GeneralInput>
          </div>
          <div className="mt-6">
            <PasswordField
              showResetPassword={false}
              labelname="Password"
              showError={true}
            />
          </div>
          <div className="mt-6">
            <PasswordField
              showResetPassword={false}
              labelname="Confirm Password"
              showError={true}
            />
          </div>
          <div className="mt-4">
            <RememberMe text="I agree to the Terms of Service and Privacy Policy" />
          </div>
          <div className="mt-4">
            <SignInButton text={" Sign Up Now"} />
          </div>
          <div className="flex flex-col gap-4">
            <SignUpText />
          </div>
          <div className="mt-4">
            <FooterLabels />
          </div>
        </div>
      </form>
    </main>
  );
}
