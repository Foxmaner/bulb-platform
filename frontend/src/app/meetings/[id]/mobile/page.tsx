"use client";
import Link from "next/link";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Image1 from "app/../../public/bg-halfCircle.svg";
import Image2 from "app/../../public/bg-transparentLeaf.svg";
import Image3 from "app/../../public/bg-transparentLeaf2.svg";
import Image4 from "app/../../public/bg-transparentLeaf3.svg";

export default function MobilePage({ meetingTitle }: { meetingTitle: string }) {
  const [textValue, setTextValue] = useState("");

  return (
    <div className="flex w-screen h-screen content-center justify-center items-center flex-col relative">
      <Image
        src={Image4}
        alt=""
        className="w-1/4 absolute top-0 right-2 z-0"
      ></Image>
      <div className="flex flex-row justify-between">
        {/* Logga */}
        <div className="absolute left-3 top-3 z-20">
          <Link href="/">
            <h1 className="text-primary font-bold">
              EAST <br /> SWEDEN <br /> MEDTECH
            </h1>
          </Link>
          <div className="bg-primary h-0.5 w-4/5"></div>
        </div>
        {/* Meeting name */}
        <div className="font-bold self-end text-2xl pt-5 pb-5 px-5 absolute right-6 z-20">
          {meetingTitle ? meetingTitle : "Untitled meeting"}
          <div className="bg-black h-0.5 w-3/5"></div>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col w-4/5 h-4/6 bg-primaryGrey border-edge border-2 mx-5 my-3 p-3 z-20">
        <Textarea
          radius="none"
          color="default"
          minRows={1}
          variant="underlined"
          size="lg"
          placeholder="Untitled Postit..."
          className="text-lg text-black font-bold"
        />
        <textarea
          placeholder="Skriv här..."
          color="default"
          className="h-full text-black my-2 p-2 focus:outline-none"
        />
        <div className="flex flex-row justify-between">
          <div className="flex flex-col-reverse">
            <Image src={Image3} alt="" className="place-self-start w-2/3" />
          </div>
          <Button
            size="lg"
            radius="sm"
            variant="bordered"
            className="bg-white mt-9 border-edge font-bold text-secondaryGrey place-self-end justify-self-end p-2"
          >
            {" "}
            SKICKA
          </Button>
        </div>
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
