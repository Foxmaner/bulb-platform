"use client";

import {
  BsInfoCircle
} from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import sidebarImg from "../../../public/sidbarImg.svg";
import Menu from "./menu";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure
} from "@nextui-org/react";
import SignOutButton from "./SignOutBtn";
import RequestApi from "app/utils/client-request";
import { useUserContext } from "app/context/userProvider";



const navbarPaths = [
  "/meetings",
  "/calendar",
  "/help",
  "/templates",
  "/profile",
  "/organisation",
  "/admin/meetings",
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserContext();

  //Detta för att inte visa sideBar på Skapasidan, en sk fulfix.
  if (!navbarPaths.includes(pathname)) {
    return <></>;
  }

  const handleOAuth = async () => {
		const response = await RequestApi.post({
            url: "/auth/logout",
        });

        if (response.status === 200) {
            window.location.href = "/login";
        }
	};

  console.log(user)

  return (
    <div className="bg-primaryGrey h-screen flex flex-col py-2.5">
      {/* Logo */}
      <div className="px-5 py-2">
        <Link href="/">
          <h1 className="text-primary font-bold text-3xl">
            East <br /> Sweden <br /> MedTech
          </h1>
        </Link>
        <div className="bg-primary h-1 w-5/6 content-center"></div>
      </div>

      {/* Border */}
      <div className="border-edge border-t-1 w-5/6 self-center" />

      {/* Meny */}
      <div className="px-5 pt-3 pb-5 w-full">
        <h2 className="text-gray-800 font-bold mb-1">Meny</h2>
        <ul className="w-full">
          <Menu />
        </ul>
      </div>

      {/* Image */}
      <div className="flex flex-col-reverse flex-grow overflow-hidden relative">
        <Image
          src={sidebarImg}
          alt="Sidebar Image"
          className="absolute w-3/5"
        />
      </div>

      {/* Border */}
      <div className="border-edge border-t-1 w-5/6 self-center" />

      {/* Actionbar */}
      <div className="py-4">
        <Link href={"/help"} className="text-gray-500 items-center flex w-full mx-2 font-bold">
          {" "}
          <BsInfoCircle color="grey" className="mx-2"/> Info
        </Link>
      </div>

      {/* Border */}
      <div className="border-edge border-t-1 w-5/6 self-center" />

      <div className="flex p-1 mx-2 my-1 w-full">
        <Dropdown>
          <DropdownTrigger>
            <div className="h-14 cursor-pointer w-14 bg-secondary flex justify-center items-center text-white rounded-md relative">
                <h1 className="text-2xl">
                  {
                    user?.name?.charAt(0).toUpperCase()
                  }
                </h1>
              <div className="w-3 h-3 bg-online rounded-full absolute right-1 bottom-1 border-2 border-secondaryGrey"/>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem color="secondary" key="profile" onPress={(e) => router.push("/profile")}>
              Profil
            </DropdownItem>
            <DropdownItem color="danger" className="text-danger" key="signout" onPress={handleOAuth}>
              Logga ut
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="flex flex-col justify-center items-start mx-2">
          <h1 className="text-primary font-bold text-md p-0">{user?.name}</h1>
          <h2 aria-label="East Sweden Medtech" className="text-gray-500 text-xs p-0 -mt-1 w-24 truncate">{user?.team}</h2>
        </div>
      </div>
    </div>
  );
}
