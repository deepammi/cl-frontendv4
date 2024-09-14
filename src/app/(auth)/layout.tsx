import { ReactNode } from "react";
import companyLogoUrl from "../../../public/Image/CompanyLogo.svg";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-[0_0_40%] bg-[#B6C2F5] relative w-full md:w-auto h-[60vh] md:h-auto">
            <div className="absolute top-8 left-8 flex gap-2 items-center">
              <div>
                <Image src={companyLogoUrl} alt="logo" width={40} height={40} />
              </div>
              <div className="text-[1.2rem] font-semibold text-[#767BDE]">
                Turigma.ai
              </div>
            </div>
            <div className="mt-[30%] md:mt-[40%] ml-[10%] md:ml-[20%]">
              <div>
                <div className="text-white text-[2rem] md:text-[2.5rem] font-medium">
                  Welcome Back
                </div>
                <div className="w-[80%] md:w-[70%] text-white font-medium">
                  To keep connected with us please login with your personal info
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex-[0_0_60%] w-full md:w-auto">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
