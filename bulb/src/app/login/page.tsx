
import Image from "next/image";
import Link from "next/link";
import SignInButton from "../components/SignInBtn";

import loginImage2 from "../../../public/login2.svg";
import loginImage3 from "../../../public/login3.svg";
import loginImage4 from "../../../public/login4.svg";

import bgDecoration from "../../../public/bg-decoration.svg";

export default function Home() {
  return (
    <div className="flex w-screen h-screen flex-shrink-0">
      {/* Upper left images */}
      <div className="w-[8%] lg:w-1/7 z-10 absolute top-0 left-0">
        <Image src={loginImage3} alt="Login Image" />
        <Image src={loginImage4} alt="Login Image" />
      </div>

      {/* Upper right botom images */}
      <div className="w-2/5 lg:w-1/7 z-10 absolute bottom-0 right-0">
        <Image src={bgDecoration} alt="Login Image" />
      </div>

      {/* Vänstra halvan */}
      <div className="bg-primary w-1/2 flex place-items-center place-content-center relative">
        <div className="border-white border-2">
          <div className="bg-white border-primary border-4 flex flex-col">
            <div className="p-5">
              <h1 className="text-primary font-bold text-base">
                EAST <br /> SWEDEN <br /> MEDTECH
              </h1>
              <div className="bg-primary h-1 w-2/5"></div>
            </div>
            <div className="px-5 pt- self-center">
              <h1 className="text-primary font-bold">Login</h1>
            </div>
            <div className="bg-gray-300 h-1 mx-7"></div>
            <Link href="/meetings">
              <div className="px-7 pt-10 pb-16">
                <SignInButton />
              </div>
            </Link>
          </div>
        </div>
        {/* Vänstra Halva right botom images */}
        <div className="w-[16%] lg:w-1/7 z-10 absolute bottom-0 right-0">
          <Image src={loginImage2} alt="Login Image" />
        </div>
      </div>

      {/* Högra halvan */}
      <Link href={"http://localhost:3000"} className="w-1/2 flex flex-col flex-shrink-0">
        <div className="p-10 flex flex-row-reverse">
          <div className="bg-primary p-1">
            <h1 className="text-white font-bold text-4xl border-white border-2 py-10 px-20">
              East <br /> Sweden <br /> MedTech
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}
