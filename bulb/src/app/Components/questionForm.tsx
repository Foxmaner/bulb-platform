
'use client';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";




export default function QuestionForm() {


    return (
        <div className="flex flex-col gap-1">
            <Textarea 
                variant="bordered"
                radius="none"
                labelPlacement="outside"
                placeholder="Skriv din fråga här"
                className="flex"
                minRows={1}
                />
            
            <div className="flex">
                <Textarea variant="bordered" 
                placeholder="Antecka svar här"
                radius="none"
                
                />

               
            </div>
        </div>
    )

};
