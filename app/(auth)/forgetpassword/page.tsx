import EmailField from "@/components/atoms/textatom";
import PasswordField from "@/components/atoms/password";
import RememberMe from "@/components/atoms/rememberme";
import SignInButton from "@/components/atoms/button";
import SignUpText from "@/components/atoms/signuptext";
import { GeneralInput } from "@/components/atoms/inputAtom";
import Link from "next/link";
export default function ForgetPassword() {
  return (
    <main
      className="flex flex-row min-h-screen w-full font-sans"
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <form
        className="flex place-items-center w-1/2 justify-center"
        style={{ width: "480px", height: " 535px", flexDirection: "column" }}
      >
        <div
          className="test"
          style={{
            height: "1280px",
            width: "480px",
            background: "#D85B001A",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="./icon.svg"
            alt="icon"
            style={{
              background: "white",
              borderRadius: " 50%",
              width: " 86px",
              height: "72px",
            }}
          />
        </div>
        <div className="gap-25px w-440px h-460px t-220.14px l  p-10 flex flex-col items-start">
          <h1 className="text-[30px] font-bold text-[#1A1C1E] mb-2">
            Forgot Password?{" "}
          </h1>
          <p className="text-[#6B7280] mb-8">
            No worries! Enter the email address associated with your account,
            and we'll send you a link to reset your password.
          </p>

          <GeneralInput
            placeholder="e.g.name@company.com"
            type="email"
            labelname="Work Email Address"
          ></GeneralInput>
          <div className="mt-4" style={{ paddingBottom: "26px" }}>
            <SignInButton text={"Send Reset Link"} />
          </div>
          <div className="flex flex-col gap-4 w-[100%]">
            <p
              className="font-bold text-[14px] leading-[20px] flex flex-col items-center "
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <img
                src="./arrow.svg"
                alt="arrow"
                style={{ paddingRight: "8px" }}
              />
              Return to Login
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
