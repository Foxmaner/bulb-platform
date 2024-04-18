
'use client';
import {
    Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
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
    //Detta är till för att lägga till Rubriker i katalogen
    const [value, setValue] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    //Måste berätta för Typescript att det är en sjukt nice 
    const popupRef = useRef<HTMLDivElement>(null);
    const { meeting, setMeeting } = useMeetingContext();
    const [ title, setTitle ] = useState<string>(data.title || "")

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
    const addParagraph = (useTitle?: boolean) => {
        setMeeting({
            ...meeting,
            sections: meeting.sections.map(section => {
                if (section._id === data._id) {
                    const newPargraph: Paragraph = {
                        title:"",
                        text: "",
                        _id: "123",
                        useTitle
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
        const isConfirmed = window.confirm("Är du säker på att du vill ta bort stycket?");
        if (isConfirmed) {
            setMeeting({
                ...meeting,
                sections: meeting.sections.map(section => {
                    if (section._id === data._id) {
                        return {
                            ...section,
                            paragraphs: section.paragraphs?.filter((section, i) => i !== index)
                        };
                    }
                    return section;
                })
            })
        }
    };
    //Fortsätt här, fixa så att det blir samma som för paragraphs
    const addSectionTitle = (title: string) => {
        setTitle(title);

        setMeeting({
            ...meeting,
            sections: meeting.sections.map(section => {
                if (section._id === data._id) {
                    
                    
                    section.title = title;
                    
                    return {
                        ...section,
                        
                    }
                }
                return section;
            })
        })
    }

    
    return (
        <div className="flex flex-col gap-2">
            <Textarea
                variant="underlined"
                radius="none"
                labelPlacement="outside"
                placeholder="Titel"
                className="flex w-11/12"
                value={title}
                onValueChange={addSectionTitle}
                minRows={1}
                style={{ fontWeight: 'bold', fontSize: '16px' }}
            />
            {
                data.paragraphs?.map((paragraph: Paragraph, index: number) => (
                    <div key={index}>
                        <ParagraphForm data={paragraph} />
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
                    <div className="border-2 w-11/12 h-11/12 text-center border-dashed cursor-pointer" onClick={onOpen}>
                        <p className="text-3xl select-none">+</p>
                    </div>



                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalBody>
                                        <p className="block text-center text-lg text-bold text-primaryText select-none">Lägg till stycke</p>
                                        <button onClick={() => {addParagraph(); onClose()}} className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                                            Stycke
                                        </button>
                                        <button onClick={() => {addParagraph(true); onClose()}} className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                                            Stycke med underrubrik
                                        </button>
                                        <button className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                                            Bild
                                        </button>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Stäng
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </div>
    )

};
