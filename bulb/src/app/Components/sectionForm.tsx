
'use client';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ParagraphForm from "./paragraph";

import { Section, Paragraph } from "index";
import { title } from "process";
import { useMeetingContext } from "../context/meetingProvider";


interface SectionFormProps {
    data: Section // title, _id, paragraphs
}

export default function SectionForm({ data }: SectionFormProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    //Måste berätta för Typescript att det är en sjukt nice div
    const popupRef = useRef<HTMLDivElement>(null);
    const { meeting, setMeeting } = useMeetingContext();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


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



    /**
    *  setMeeting(
    *   ...meting = shallow copy
    *     sections: meetings.section.map... = loopar igenom sections kollar id = id. id kommer från backend senare i tiden
    *    Om id:t, dvs data i functionfältet )
    *  Går igenom alla sektioner i mötet och letar efter samma id som denna sektion
    *  Då kan vi lägga till qtt stycken vi vill i denna sektion
    *  Och bara returnera den sektionenerna
    */
    const addParagraph = (title?: string) => {
        setMeeting({
            ...meeting,
            sections: meeting.sections.map(section => {
                if (section._id === data._id) {
                    const newPargraph = {
                        title: title
                    }

                    return {
                        ...section,
                        paragraphs: [...(section.paragraphs || []), newPargraph]
                    }
                }
                return section;
            })
        })
    }

    const deleteParagraph = (index: number) => {

        setMeeting({
            ...meeting,
            sections: meeting.sections.map(section => {
                if (section._id === data._id) {
                    return {
                        ...section,
                        paragraphs: section.paragraphs?.filter((_, i) => i !== index)
                    };
                }
                return section;
            })
        })

    };


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
                data.paragraphs?.map((paragraph: Paragraph, index: number) => (
                    <div key={index}>
                        <ParagraphForm title={paragraph.title} />
                        <Button
                            onClick={() => deleteParagraph(index)}
                            variant="light"
                            size="sm"
                            radius="full"
                            color="danger"
                        >Delete </Button>
                    </div>
                )


                )}

            <div className="flex flex-col w-full h-full">
                <div ref={popupRef} className="relative w-full h-full flex justify-center">
                    <div className="border-2 w-11/12 h-11/12 text-center border-dashed cursor-pointer" onClick={toggleMenu}>
                        <p className="text-3xl select-none">+</p>
                    </div>


                    {(menuOpen) && (
                        <div ref={popupRef} className="flex z-10 justify-center absolute mt-2 w-96 h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                            <div className="flex flex-col justify-center py-1">
                                <p className="block text-center text-lg text-bold text-primaryText select-none">Lägg till stycke</p>
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
