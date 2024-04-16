
'use client';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";


interface IParagraphFormProps {
    title?: string
}

export default function ParagraphForm({ title: defautlTitle }: IParagraphFormProps) {
    const [ title, setTitle  ] = useState<string>(defautlTitle || "");

    const addTitle = () => {
        
    }

    return (
        <div className="flex flex-col gap-2">
            {
                title && (
                    <Textarea 
                        variant="bordered"
                        radius="none"
                        labelPlacement="outside"
                        placeholder="Underrubrik"
                        className="flex"
                        minRows={1}
                    />
                )
            }

            <div className="flex flex-col gap-1">
                <Textarea
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    placeholder="Skriv text här"
                    className="flex"
                    minRows={5}
                />
            </div>
            {}
            
        </div>
    )

};
