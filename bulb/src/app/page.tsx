"use client";

import Image from "next/image";
import Link from "next/link";
import SignInButton from "./Components/SignInBtn";
import loginImage from "../../public/login.svg";
import loginImage2 from "../../public/login2.svg";
import loginImage3 from "../../public/login3.svg";
import loginImage4 from "../../public/login4.svg";

export default function Home() {
  return (
    <div className="flex w-screen h-screen flex-shrink-0">
      {/* Vänstra halvan */}
      <div className="bg-primary flex w-full md:w-1/2 place-items-center place-content-center relative">
        {/* Upper left images */}
        <div className="w-1/6 lg:w-1/7 z-10 absolute top-0 left-0">
          <Image src={loginImage3} alt="Login Image" />
          <Image src={loginImage4} alt="Login Image" />
        </div>

        {/* Login-ruta */}
        {/* TODO: göra rutan större för större skärmar */}
        <div className="border-white border-2 z-20">
          <div className="bg-white border-primary border-4 flex flex-col">
            {/* East Sweden Medtech */}
            <div className="p-5">
              <h1 className="text-primary font-bold text-base">
                EAST <br /> SWEDEN <br /> MEDTECH
              </h1>
              <div className="bg-primary h-1 w-2/5"></div>
            </div>
            {/* Login */}
            <div className="px-5 pt- self-center">
              <h1 className="text-primary font-bold">Login</h1>
            </div>
            <div className="bg-gray-300 h-1 mx-7"></div>
            {/* Google login (vet inte om man ska ha href eller inte) */}
            <Link href="/meetings">
              <div className="px-7 pt-10 pb-16">
                <SignInButton />
              </div>
            </Link>
          </div>
        </div>

        {/* Lower right image */}
        <div className="w-1/6 lg:w-1/7 z-10 absolute bottom-0 right-0">
          <Image src={loginImage2} alt="Login Image" />
        </div>
      </div>

      {/* Högra halvan */}
      <div className="bg-white w-0 md:w-1/2 flex flex-col flex-shrink-0 overflow-hidden relative">
        <div className="p-10 flex flex-row-reverse overflow-hidden">
          {/* Textruta */}
          <div className="bg-primary p-1 z-20">
            <h1 className="text-white font-bold text-4xl lg:text-5xl border-white border-2 py-10 px-20">
              East <br /> Sweden <br /> MedTech
            </h1>
          </div>
        </div>
        {/* Lower right image */}
        <div className="flex w-4/5 z-10 absolute bottom-0 right-0 ">
          <Image src={loginImage} alt="Login Image" />
        </div>
      </div>
    </div>
  );
}
