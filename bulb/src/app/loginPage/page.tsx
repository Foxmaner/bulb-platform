"use client";

import Image from "next/image";
import Link from "next/link";
import SignInButton from "../Components/SignInBtn";
import loginImage2 from "../../../public/login2.svg";
import loginImage3 from "../../../public/login3.svg";
import loginImage4 from "../../../public/login4.svg";

{
  /* Borde login rutan bara vara en pop-up på startskärmen? */
}
export default function Home() {
  return (
    <div className="flex w-screen h-screen bg-primary place-items-center place-content-center relative flex-shrink-0">
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
          <div className="px-5 pt-5 self-center">
            <h1 className="text-primary font-bold">Logga in</h1>
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
      <div className="flex w-1/6 lg:w-1/7 z-10 absolute bottom-0 right-0 flex-row-reverse">
        <Image src={loginImage2} alt="Login Image" />
      </div>
    </div>
  );
}
