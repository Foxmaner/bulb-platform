"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-screen h-screen flex-shrink-0 overflow-hidden">
      <div className="bg-primary w-1/2 flex place-items-center place-content-center">
        <div className="border-white border-2">
          <div className="bg-white border-primary border-4 flex flex-col">
            <div className="p-5">
              <h1 className="text-primary font-bold text-base">
                East <br /> Sweden <br /> MedTech
              </h1>
              <div className="bg-primary h-1 w-5/6 content-center"></div>
            </div>
            <Link href={"http://localhost:3001/auth/google"}>
              <div className="p-10">Log in</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col flex-shrink-0">
        {" "}
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
