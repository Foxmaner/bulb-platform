/**
 * SectionForm Component
 * 
 * This component is responsible for rendering a form for a section of a meeting.
 * It allows users to add, edit, and delete paragraphs within the section.
 * 
 * Props:
 * - data: Section - The data for the section containing title, _id, and paragraphs.
 * 
 * Usage:
 * <SectionForm data={sectionData} />
 */
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
import { useEffect, useState, useRef, useCallback } from "react";
import ParagraphForm from "../paragraph/paragraph";

import { Section, Paragraph } from "index";
import { title } from "process";
import { useMeetingContext } from "../../context/meetingProvider";

import { useCurrentEditor, useEditorContext } from '../../context/editorProvider';


interface SectionFormProps {
    data: Section; // title, _id, paragraphs
    selectedSectionTitle: string | null;
}

export default function SectionForm({ data, selectedSectionTitle }: SectionFormProps) {
    //Detta är till för att lägga till Rubriker i katalogen
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    //Måste berätta för Typescript att det är en sjukt nice 
    const popupRef = useRef<HTMLDivElement>(null);
    const { meeting, setMeeting } = useMeetingContext();
    const [ title, setTitle ] = useState<string>(data.title || "");

    const { doc, currentEditor, setCurrentEditor } = useEditorContext();

    const sectionRef = useRef<HTMLTextAreaElement>(null)

    const { socket } = useCurrentEditor();

    /**
    *  setMeeting(
    *   ...meting = shallow copy
    *     sections: meetings.section.map... = loopar igenom sections kollar id = id. id kommer från backend senare i tiden
    *    Om id:t, dvs data i functionfältet )
    *  Går igenom alla sektioner i mötet och letar efter samma id som denna sektion
    *  Då kan vi lägga till qtt stycken vi vill i denna sektion
    *  Och bara returnera den sektionenerna
    */
    const addParagraph = useCallback((_id: string) => {
        console.log('addParagraph', _id)

        const newPargraph: Paragraph = {
            title: {
                text: "",
                comments: [],
                history: []
            },
            body: {
                text: "",
                comments: [],
                history: []
            },
            _id
        }

        setMeeting({
            ...meeting,
            sections: meeting.sections.map(section => {
                
                if (section._id === data._id) {
                    return {
                        ...section,
                        contains: [...(section.contains || []), newPargraph]
                    }
                }
                return section;
            })
        })
    }, [data._id, meeting, setMeeting]);

    const sendAddParagraph = useCallback((useTitle?: boolean) => {
        
        socket?.emit("paragraph_create", { meetingID: meeting._id, sectionID: data._id }, (response: any) => {

            

            addParagraph(response.paragraph.toString())
            
        });
    }, [socket, meeting._id, data._id, addParagraph]);

    const updateSectionTitle = (title: string) => {
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

    useEffect(() => {
        const socketHandler = () => {
            socket?.on("paragraph_created", (data: any) => {
                
                addParagraph(data.paragraph.id);
            });

            socket?.on("removeParagraph", (data: any) => {
                
                addParagraph(data.id);
            });

            return () => {
                socket?.off("addParagraph");
                socket?.off("removeParagraph");
            };
        }

        const handler = (event: MouseEvent) => {
            if (popupRef.current && popupRef.current.contains(event.target as Node)) {
                return;
            }
        };

        if (data.title === selectedSectionTitle) {
            //Scroll to the section
            sectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        const socketOff = socketHandler();

        document.addEventListener("mousedown", handler);

        return () => {
            socketOff();
            document.removeEventListener("mousedown", handler);
        };
    }, [socket, selectedSectionTitle, data.title, addParagraph]);

    const deleteParagraph = useCallback((id: string) => {
        const isConfirmed = window.confirm("Är du säker på att du vill ta bort stycket?");
        if (isConfirmed) {

            currentEditor?.destroy();
            setCurrentEditor(null);

            console.log(doc.share)
            console.log("9999", `${data._id}.${id}`)

             
            setMeeting(prevMeeting => ({
                ...prevMeeting,
                sections: prevMeeting.sections.map(section => {
                    if (section._id === data._id) {
                        console.log(section.contains.filter(paragraph => paragraph._id !== id))
                        console.log("id", id)
                        
                        return ({
                            ...section,
                            contains: section.contains.filter(paragraph => paragraph._id !== id)
                        });
                    }
                    return section;
                })
            }));
        }
    }, [currentEditor, data._id, doc.share, setMeeting, setCurrentEditor]);

    return (
        <div className="flex flex-col gap-2 w-full items-center">
            <Textarea
                variant="underlined"
                radius="none"
                labelPlacement="outside"
                placeholder="Titel"
                className="flex w-full truncate"
                value={title}
                onValueChange={updateSectionTitle}
                minRows={1}
                style={{ fontWeight: 'bold', fontSize: '16px' }}
            />
            {
                data.contains?.map((paragraph: Paragraph, index: number) => (
                    <div key={index} className="flex justify-center items-center w-full px-2">
                        <ParagraphForm deleteParagraph={deleteParagraph} sectionID={data._id} data={paragraph} />
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
                                        <button onClick={() => {sendAddParagraph(); onClose()}} className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                                            Stycke
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
