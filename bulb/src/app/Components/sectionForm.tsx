
'use client';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";




export default function QuestionForm() {


    return (
        <div className="flex flex-col gap-2">
            <Textarea 
                variant="underlined"
                radius="none"
                labelPlacement="outside"
                placeholder="Titel"
                className="flex w-11/12"
                minRows={1}
                style={{fontWeight:'bold', fontSize:'16px'}}
                />
            <div className="flex w-11/12 h-1 bg-secondaryGrey"></div>
            
            <div className="flex w-11/12 h-full">
                <Textarea variant="bordered" 
                placeholder="Antecka svar här"
                radius="none"
                />

               
            </div>
        </div>
    )

};
