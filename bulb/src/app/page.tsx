"use client";

import Link from "next/link";
import SignInButton from "./Components/SignInBtn";

export default function Home() {
  return (
    <div className="flex w-screen h-screen flex-shrink-0">
      {/* Vänstra halvan */}
      <div className="bg-primary w-1/2 flex place-items-center place-content-center">
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
      </div>

      {/* Högra halvan */}
      <div className="w-1/2 flex flex-col flex-shrink-0">
        <div className="p-10 flex flex-row-reverse">
          <div className="bg-primary p-1">
            <h1 className="text-white font-bold text-4xl border-white border-2 py-10 px-20">
              East <br /> Sweden <br /> MedTech
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
