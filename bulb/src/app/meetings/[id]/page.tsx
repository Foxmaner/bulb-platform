/**
 * MeetingPage Component
 * 
 * This component represents the meeting page UI where users can view and edit meeting content.
 * It displays the meeting title, date, catalog, and sections with options to add new sections.
 * 
 * Usage:
 * <MeetingPage />
 * 
 * Note: This component assumes the usage of Next.js and includes components from the NextUI library.
 */

"use client";

import { Button, ScrollShadow, ButtonGroup, Tooltip, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddSection from "../../components/section/defaultAddsection";

import SectionForm from "app/components/section/sectionForm"

import { Section, Paragraph } from "index";

import { useMeetingContext } from "../../context/meetingProvider";
import Tiptap from "app/components/paragraph/tiptap/tiptap";
import { Toolbar } from "app/components/toolbar";
import { useEditor } from "@tiptap/react";

import { useCurrentEditor } from "app/context/editorProvider";
import MeetingHelpInfo from "app/components/MeetingHelpInfo";

import { useRouter } from "next/navigation";


export default function MeetingPage() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { meeting, setMeeting } = useMeetingContext();
    const router = useRouter();
    const { socket } = useCurrentEditor();
    
    
    const [ selectedSectionTitle, setSelectedSectionTitle ] = useState<string | null>(null);
    const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
    
    const scrollToTitle = (ref: string) => {
        const section = meeting.sections.find(section => section.title === ref)
       if(section){
        const sectionIndex = meeting.sections.indexOf(section);
        const sectionRef = sectionRefs.current[sectionIndex]?.current
        if(sectionRef){
            window.scrollTo({
                top :sectionRef.offsetTop,
                behavior: 'smooth'
            })
        }
       }
    };

    const scrollToTitleButtonClick = (title: string) => {
        scrollToTitle(title);
        setSelectedSectionTitle(title);
    };

    const addSection = useCallback(({ _id }: any) => {
        const newSection: Section = {
            _id: _id,
            title: "Nytt Avsnitt",
            contains: []
        }

        setMeeting({ ...meeting, sections: [...meeting.sections, newSection] })
    }, [meeting, setMeeting]);

    const sendAddSection = useCallback((useTitle?: boolean) => {
        console.log('section_create')
        console.log(meeting)
        socket?.emit("section_create", { meetingID: meeting._id }, (data: any) => {
            addSection(data.section);
        });
    }, [addSection, meeting, socket]);

    useEffect(() => {
        if (socket) {
            socket.on('section_created', (data: any) => {
                console.log('section_created 788', data)
                addSection(data.section);
            })
        }
    }, [socket, addSection])

    if (meeting._id === "") {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }
 
    return (
       
        <div className="flex w-screen h-screen content-center justify-center items-center">
            <div className="flex flex-row gap-10 bg-white w-[calc(95%)] h-[calc(95%)] ">
                {/*Vänstra div den med loggan*/}
                <div className="flex flex-col text-black">
                    <div className='p-5'>
                        <Link href="/">
                            <h1 className="text-primary font-bold text-3xl">East <br /> Sweden <br /> MedTech</h1>
                        </Link>

                    </div>
                    {/*Katalogen*/}
                    <div className="bg-secondaryGrey h-1 w-full"></div>
                    <div className="flex flex-col justify-center py-2">
                        <p className="text-center text-xl">Catalog</p>
                        <ul className="flex flex-col py-2">
                            {
                                meeting.sections.map((section: Section, index: number) => (
                                    <div key={index} className="flex items-center flex-col">
                                        <Tooltip content={section.title} isDisabled={!section.title}>
                                            <Button isDisabled={!section.title} onClick = {() => scrollToTitleButtonClick(section.title)} variant="light" className="w-36 underline" key={index}>
                                                <p className="truncate">
                                                    {section.title}
                                                </p>
                                            </Button>
                                        </Tooltip>
                                        {section.contains?.map((paragraph: Paragraph, paragraphIndex: number) =>
                                            <Tooltip key={paragraphIndex} content={paragraph.title?.text} isDisabled={!paragraph.title?.text}>
                                                <Button variant="light" className="w-28 underline" key={paragraphIndex}>
                                                    <p className="truncate">
                                                        {paragraph.title?.text}
                                                    </p>
                                                </Button>
                                            </Tooltip>
                                        )}
                                    </div>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-secondaryGrey h-5/6 w-1 content-center"></div>

                <div className="flex flex-col text-primaryText gap-5 w-11/12 py-5">

                    <div className="flex flex-row border-b-1 border-edge">                    
                        <div className="flex flex-col gap-2 w-11/12">
                            <Input
                                classNames={{
                                    input: "text-3xl font-bold text-black placeholder:text-black bg-transparent",
                                    inputWrapper: "bg-transparent shadow-none border-none",
                                }} 
                                disableAnimation={true} 
                                radius="lg" 
                                type={meeting.name} 
                                placeholder="Tomt möte" 
                                isRequired={true}
                            />
                            <p className="text-primaryText text-sm">2024 - 01 - 01</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Button color="primary" size="sm">Publicera</Button>
                            <Button color="primary" size="sm">Dela</Button>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        
                        <Button variant="solid" className="bg-primaryGrey border-2 border-edge" onClick={() => sendAddSection()}>Nytt avsnitt</Button>
                      
                        <Toolbar />
                      
                    </div>
                    
                    <ScrollShadow hideScrollBar size={20}>
                        <div className="w-full h-screen">
                            {
                                meeting.sections.map((section: Section, index: number) => <SectionForm key={index} data={section} selectedSectionTitle={selectedSectionTitle}/>)
                            }
                            {
                                (meeting.sections.length == 0) && (
                                    <div className="flex w-11/12 h-11/12 py-5">
                                        <AddSection addSection={() => sendAddSection()} />
                                    </div>
                                )
                            }

                        </div>
                    </ScrollShadow>
                    <div className="place-self-end">
                        <div className="flex flex-row gap-2">
                            <Button color="primary" size="sm" onClick={() => router.push("/meetings")}>Stäng</Button>
                            <Button color="primary" size="sm">Publicera</Button>
                            <Button color="primary" size="sm">Dela</Button>
                        </div>
                        <Modal backdrop="transparent" isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                            <ModalContent>
                                {(onclose) =>(
                                    <>
                                    <ModalHeader className="flex flex-col gap-1">Hjälp</ModalHeader>
                                    <ModalBody>
                                        <MeetingHelpInfo/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onClick={onclose}>Stäng</Button>
                                    </ModalFooter>
                                    </>
                                )}
                            </ModalContent>

                        </Modal>
                    </div>
                </div>

            </div>

        </div>
       
    );

}
