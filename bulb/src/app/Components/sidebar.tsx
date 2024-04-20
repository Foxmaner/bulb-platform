"use client";

import {
  BsCalendarEvent,
  BsFileEarmarkTextFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Switch } from "@nextui-org/react";
import sidebarImg from "../../../public/sidbarImg.svg";
import Menu from "./menu";

export default function Sidebar() {
  const pathname = usePathname();

  //Detta för att inte visa sideBar på Skapasidan, en sk fulfix.
  if (pathname.includes("/meetings/")) {
    return <></>;
  }

  //Detta för att inte visa sideBar på Skapasidan, en sk fulfix.
  if (pathname.includes("create")) {
    return <></>;
  }

  //Detta för att inte visa sideBar på Hemsidan, en sk fulfix.
  if (pathname === "/") {
    return <></>;
  }

  return (
    <div className="bg-primaryGrey h-screen flex flex-col">
      {/* Logo */}
      <div className="p-5">
        <Link href="/">
          <h1 className="text-primary font-bold text-3xl">
            East <br /> Sweden <br /> MedTech
          </h1>
        </Link>
        <div className="bg-primary h-1 w-5/6 content-center"></div>
      </div>

      {/* Border */}
      <div className="border-edge border-y-1 w-5/6 self-center" />

      {/* Meny */}
      <div className="px-5 pt-3 pb-5">
        <h2 className="text-gray-800 font-bold mb-1">Meny</h2>
        <ul>
          <Menu />
        </ul>
      </div>

      {/* Image */}
      <div className="flex flex-col-reverse flex-grow overflow-hidden relative">
        <Image
          src={sidebarImg}
          alt="Sidebar Image"
          className="absolute w-full"
        />
      </div>

      {/* Actionbar */}
      <div className="py-1">
        <button className="text-gray-500 items-center flex w-full mx-2">
          {" "}
          <BsFillInfoCircleFill color="grey" /> Info
        </button>
        {
          <Switch defaultSelected size="sm" className="ml-2">
            <p className="text-gray-500 text-sm">Darkmode</p>
          </Switch>
        }
      </div>

      {/* Border */}
      <div className="border-edge border-y-1 w-5/6 self-center" />

      <div className="flex p-1">
        <Image
          src="/logo-1.png"
          alt="East Sweden MedTech"
          width={80}
          height={80}
          className="p-1 w-1/3 rounded-2xl overflow-hidden"
        />
        <div className="width-full flex-col content-center items-center">
          <p className="text-gray-500 text-sm">
            East Sweden <br></br> MedTech
          </p>
          <p className="text-gray-500 text-sm">© 2024</p>
        </div>
      </div>
    </div>
  );
}
