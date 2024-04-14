
'use client';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ParagraphForm from "./paragraph";

import QuestionForm from "./questionForm";
import { paragraph, question, section } from "index";
import { title } from "process";


interface SectionFormProps {
    data: section
}

export default function SectionForm({ data }: SectionFormProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    //Måste berätta för Typescript att det är en sjukt nice div
    const popupRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [paragraphs, setParagraphs] = useState<paragraph[]>(data.paragraphs || [])

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (popupRef.current && popupRef.current.contains(event.target as Node)) {
                return;
            }
            setMenuOpen(false);
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const addParagraph = (title?: string) => {
        setParagraphs([...paragraphs, { title: title }])
    }

    return (
        <div className="flex flex-col gap-2">
            <Textarea
                variant="underlined"
                radius="none"
                labelPlacement="outside"
                placeholder="Titel"
                className="flex w-11/12"
                minRows={1}
                style={{ fontWeight: 'bold', fontSize: '16px' }}
            />
            {
                paragraphs?.map((paragraph) => <ParagraphForm title={paragraph.title} />)
            }
            <div className="flex flex-col w-full h-full">
                <div ref={popupRef} className="relative w-full h-full flex justify-center">
                    <div className="border-2 w-11/12 h-11/12 text-center border-dashed cursor-pointer" onClick={toggleMenu}>
                        <p className="text-3xl select-none">+</p>
                    </div>


                    {(menuOpen) && (
                        <div ref={popupRef} className="flex z-10 justify-center absolute mt-2 w-96 h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                            <div className="flex flex-col py-1">
                                <p className="flex text-lg text-primaryText select-none">Lägg till stycke</p>
                                <button onClick={() => addParagraph()} className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                                    Stycke
                                </button>
                                <button onClick={() => addParagraph("Paragraf Rubrik")} className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                                    Stycke med underrubrik
                                </button>
                                <button className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                                    Bild
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

};
