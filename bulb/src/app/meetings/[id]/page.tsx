import { Button } from "@nextui-org/react";
import { FormEvent } from "react";
import Link from "next/link";

export default function createPage() {

    return (

        <div className="flex w-screen h-screen content-center justify-center items-center">
            <div className="flex flex-row gap-10 bg-white w-[calc(90%)] h-[calc(90%)] ">
                {/*Vänstra div den med loggan*/}
                <div className="flex flex-col text-black">
                    <div className='p-5'>
                        <Link href="/">
                            <h1 className="text-pink-900 font-bold text-3xl">East <br /> Sweden <br /> MedTech</h1>
                        </Link>

                    </div>
                    <div className="bg-gray-300 h-1 w-full"></div>
                </div>

                <div className="bg-gray-300 h-5/6 w-1 content-center"></div>

                <div className="flex flex-col text-black gap-10">
                    <div className="flex flex-col gap-2 ">
                        <p className="text-black text-5xl font-bold">Untitled meeting</p>
                        <p className="text-black text-sm">Det lilla roliga mötet</p>
                    </div>

                    <div className="flex flex-row justify-between">
                        <Button className="bg-white border-2 border-gray-200 w-4 h-6 m-2">File</Button>
                        <Button className="bg-white border-2 border-gray-200 w-4 h-6 m-2">Edit</Button>
                        <Button className="bg-white border-2 border-gray-200 w-4 h-6 m-2">Insert</Button>
                        <Button className="bg-white border-2 border-gray-200 w-4 h-6 m-2">Format</Button>
                        <Button className="bg-white border-2 border-gray-200 w-4 h-6 m-2">Help</Button>
                    </div>
                    <div className="flex">
                        <form action="" className="flex flex-col gap-20">
                            <textarea name="" id="" cols={30} rows={10} placeholder="Placeholder" className="p-5 rounded border-2 border-gray-200"></textarea>
                            <Button className="bg-white border-2 border-gray-200 w-4 h-6 m-2">Create</Button>
                        </form>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}