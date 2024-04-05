"use client";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function PageHeader({ userName }: { userName: string }) {
  const pathName = usePathname().slice(1);
  const router = useRouter();
  return (
    <div className="bg-primaryGrey w-full flex-col justify-between">
      <div className="w-full">
        <h2 className="text-black p-1">Good afternoon, {userName}</h2>
      </div>

      <div className="flex justify-between border-2 border-primaryBorder w-full items-center">
        <div className="flex items-start">
          <h1 className="text-black font-bold text-7xl mx-5">
            {capitalizeFirstLetter(pathName)}
          </h1>
        </div>
        <div className="flex-shrink-0">
          <Image src="/placeholder.jpg" alt="" height={122} width={400}></Image>
        </div>
      </div>

      <div className="flex gap-1 bg-white w-full">
        <Button
          onClick={() => router.push("/meetings/create")}
          className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2"
        >
          Skapa
        </Button>
        <Button className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">
          Företag
        </Button>
        <Button className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">
          Månad
        </Button>
        <Button className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">
          01
        </Button>
        <Button className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">
          Filter
        </Button>
      </div>
    </div>
  );
}
