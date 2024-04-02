'use client';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";



export default function PageHeader({ userName }: { userName: string }) {
    const pathName = usePathname().slice(1)
    const router = useRouter();
    return (
        <div className="bg-primaryGrey w-full flex-col justify-between">
            <div className="bg-white">
                <h2 className="text-black">Good afternoon, {userName}</h2>
            </div>

            <div className="border-2 border-primaryBorder">
                <div className="flex justify-between " >
                    <div className="flex items-start gap-10" >
                        <h1 className="text-black font-bold text-7xl mx-5">{pathName}</h1>
                    </div>
                    <div>
                        <Image src="/placeholder.jpg" alt="" height={122} width={400}></Image>
                    </div>
                </div>

                <div className="flex w-full gap-1">
                    <Button onClick={() => router.push("/meetings/create")} className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">Skapa</Button>
                    <Button className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">Företag</Button>
                    <Button className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">Månad</Button>
                    <Button className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">01</Button>
                    <Button className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2">Filter</Button>
                </div>
            </div>
            <div>
                <div className="bg-white text-black h-5">
                </div>
            </div>
        </div>
    );
}
