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

import Image from "next/image";

import { Button, ScrollShadow, Tooltip, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddSection from "../../components/section/defaultAddsection";

import SectionForm from "app/components/section/sectionForm"

import { Section } from "index";
  
import { useMeetingContext } from "../../context/meetingProvider";
import { Toolbar } from "app/components/toolbar";

import bgSqures from "app/../../public/bg-squares.svg";
import bgC from "app/../../public/bg-C.svg";
import bgHalfCircle from "app/../../public/bg-halfCircle.svg";
import bgLeafRight from "app/../../public/bg-leafRight.svg";
import bgLeafLeft from "app/../../public/bg-leafLeft.svg";

import { useCurrentEditor } from "app/context/editorProvider";
import MeetingHelpInfo from "app/components/MeetingHelpInfo";

import { useRouter } from "next/navigation";
import ShareModal from "app/components/ShareModal";


export default function MeetingPage() {

    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
    const { meeting, setMeeting } = useMeetingContext();
    const router = useRouter();
    const { socket, provider } = useCurrentEditor();

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

    if (meeting._id === "" || !provider) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }
 
    return (
        <div>
            <div className="absolute w-screen h-screen inset-0 z-0">
                <Image className="absolute -top-1 left-0  w-[1%]" src={bgSqures} alt="bg-squares"></Image>

                <Image className="absolute bottom-0 left-0 w-[8%]" src={bgC} alt="bg-C"></Image>

                <Image className="absolute bottom-0 right-28 w-[5%]" src={bgHalfCircle} alt="halfcircle"></Image>
                <Image className="absolute top-48 right-28 w-[5%]" src={bgLeafRight} alt="leafRight"></Image>
                <Image className="absolute top-0 right-0 w-[5%]" src={bgLeafLeft} alt="leafLeft"></Image>
                <Image className="absolute bottom-0 right-0 w-[1%]" src={bgSqures} alt="bg-squares"></Image>
            </div>
            <div className="flex w-screen h-screen content-center justify-center items-center relative">
                <div className="flex flex-row mr-[10%] mt-[1%] bg-white w-[calc(85%)] h-[calc(98%)] px-4">
                    {/*Vänstra div den med loggan*/}
                    <div className="flex flex-col text-black">
                        <div className='px-5 pt-6 pb-4'>
                            <Link href="/meetings">
                                <h1 className="text-primary font-bold text-3xl">East <br /> Sweden <br /> MedTech</h1>
                            </Link>
                        </div>
                        {/*Katalogen*/}
                        <div className="flex flex-col h-4/5 border-t-1 border-edge py-4">
                            <p className="text-center text-xl">Catalog</p>
                            <ScrollShadow hideScrollBar isEnabled={false}>
                                <ul className="flex flex-col py-2 h-[25%]">
                                    
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
                                            </div>
                                        ))}
                                    
                                </ul>
                            </ScrollShadow>
                        </div>
                    </div>

                    <div className="bg-edge h-[95%] w-[1px] content-center ml-4 mt-6"></div>

                    <div className="flex flex-col text-primaryText gap-5 w-11/12 py-5 px-8">

                        <div className="flex flex-row items-center justify-between border-b-1 border-edge pb-2">                    
                            <div className="flex flex-row items-end gap-2 w-1/3">
                                <Input
                                    classNames={{
                                        base: "w-2/3",
                                        input: "text-3xl font-bold text-titleText placeholder:text-titleText bg-transparent",
                                        inputWrapper: "bg-transparent shadow-none border-none",
                                    }} 
                                    variant="underlined"
                                    disableAnimation={true} 
                                    radius="lg" 
                                    type={meeting.name} 
                                    placeholder="Tomt möte" 
                                    isRequired={true}
                                />
                            </div>
                            <div className="flex flex-row gap-2">
                                <Button className="border-1" variant="bordered" size="sm">Publicera</Button>
                                <Button className="border-1" variant="bordered" onClick={onOpen} size="sm">Dela</Button>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 border-1 border-x-0 border-t-0 px-4">
                        
                            <Toolbar />
                            
                        </div>
                        
                        <ScrollShadow hideScrollBar isEnabled={false}>
                            <div className="w-full h-screen">
                                {
                                    meeting.sections.map((section: Section, index: number) => <SectionForm key={index} data={section} selectedSectionTitle={selectedSectionTitle}/>)
                                }
                                {
                                    (meeting.sections.length == 0) && (
                                        <div className="flex h-full w-full py-5">
                                            <AddSection addSection={() => sendAddSection()} />
                                        </div>
                                    )
                                }

                            </div>
                        </ScrollShadow>
                        <div className="place-self-end">
                            <div className="flex flex-row gap-2">
                                <Button className="border-1" variant="bordered" size="sm" onClick={() => sendAddSection()}>Nytt avsnitt</Button>
                                <Button className="border-1" variant="bordered" size="sm" onClick={() => router.push("/meetings")}>Stäng</Button>
                            </div>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm" size="xl">
                                <ModalContent>
                                    <ModalHeader className="flex flex-col gap-1">Dela Möte</ModalHeader>
                                    <ModalBody>
                                        <ShareModal/>
                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="danger" variant="light" onClick={onClose}>Stäng</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );

}
