"use client";
import Link from "next/link";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Image1 from "./../../../../../public/bg-halfCircle.svg";
import Image2 from "./../../../../../public/bg-leafLeft.svg";

export default function MobilePage({ meetingTitle }: { meetingTitle: string }) {
  const [textValue, setTextValue] = useState("");

  return (
    <div className="flex w-screen h-screen content-center justify-center items-center flex-col relative">
      <div className="flex flex-row justify-between ">
        {/* Logga */}
        <div className="absolute left-3 top-3">
          <Link href="/">
            <h1 className="text-primary font-bold">
              EAST <br /> SWEDEN <br /> MEDTECH
            </h1>
          </Link>
          <div className="bg-primary h-0.5 w-4/5"></div>
        </div>
        <div className="font-bold self-end pb-3 px-3">
          {meetingTitle ? meetingTitle : "Untitled meeting"}
          <div className="bg-black h-0.5 w-2/5"></div>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col px-5 bg-primaryGrey border-edge border-2 mx-5 mb-3 p-3">
        <Textarea
          radius="none"
          minRows={1}
          placeholder="Untitled Postit..."
          className="text-sm text-black"
        />
        <Textarea
          placeholder="Skriv här..."
          radius="none"
          className="h-full text-black"
        />
        <Button
          size="lg"
          radius="sm"
          variant="bordered"
          className="bg-white mt-9 border-edge font-bold text-secondaryGrey place-self-end p-2"
        >
          {" "}
          SKICKA
        </Button>
      </div>

      {/* Bilder */}
      <div className="flex flex-row items-end justify-between">
        <Image
          src={Image1}
          alt=""
          className="w-1/3 absolute bottom-0 left-0 z-0"
        />
        <Image
          src={Image2}
          alt=""
          className="w-1/3 absolute bottom-0 right-5"
        />
      </div>
    </div>
  );
}
