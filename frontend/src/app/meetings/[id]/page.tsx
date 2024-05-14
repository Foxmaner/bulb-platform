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
import WordCloudPage from "../../components/WordCloudPage";

import SectionForm from "app/components/section/sectionForm"

import { Section, Paragraph } from "index";
import { VerticalDotsIcon } from "components/btn/VerticalDotBtn";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";

  
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


export default function MeetingPage({ params }: { params: { id: string } }) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen:isOpenWordCloud, onOpen:onOpenWordCloud, onOpenChange:onOpenChangeWordCloud} = useDisclosure();
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
        <div>
            <div className="absolute w-screen h-screen inset-0 z-0">
                <Image className="absolute top-0 left-0  w-[1.5%]" src={bgSqures} alt="bg-squares"></Image>

                <Image className="absolute bottom-0 left-0 w-[10%]" src={bgC} alt="bg-C"></Image>

                <Image className="absolute bottom-0 right-12" src={bgHalfCircle} alt="halfcircle"></Image>
                <Image className="absolute top-48 right-28" src={bgLeafRight} alt="leafRight"></Image>
                <Image className="absolute top-0 right-0" src={bgLeafLeft} alt="leafLeft"></Image>
                <Image className="absolute bottom-0 right-0  w-[1.2%]" src={bgSqures} alt="bg-squares"></Image>
            </div>
            <div className="flex w-screen h-screen content-center justify-center items-center relative">
                <div className="flex flex-row mr-[10%] bg-white w-[calc(85%)] h-[calc(98%)] px-4">
                    {/*Vänstra div den med loggan*/}
                    <div className="flex flex-col text-black">
                        <div className='px-5 pt-6 pb-4'>
                            <Link href="/">
                                <h1 className="text-primary font-bold text-3xl">East <br /> Sweden <br /> MedTech</h1>
                            </Link>
                        </div>
                        {/*Katalogen*/}
                        <div className="flex flex-col justify-center h-5/6 border-t-1 border-edge py-4">
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
                                {new Date(meeting.date).toLocaleDateString("sv", { day: "numeric", month: "short", year: "numeric" })}
                            </div>
                            <div className="flex flex-row gap-2">
                                <Button color="primary" size="sm">Publicera</Button>
                                <Button color="primary" size="sm">Dela</Button>
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
                                <Button color="primary" size="sm" onClick={() => sendAddSection()}>Nytt avsnitt</Button>
                                <Button color="primary" size="sm" onClick={() => router.push("/meetings")}>Stäng</Button>
                                <Button color="primary" size="sm">Publicera</Button>
                                <Button color="primary" size="sm">Dela</Button>
                                <Button color="primary" size="sm" onPress={onOpenWordCloud}>Generera ordmoln</Button>
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
                            <Modal backdrop="transparent" isOpen={isOpenWordCloud} onOpenChange={onOpenChangeWordCloud} size="5xl">
                                <ModalContent>
                                    {(oncloseWordCloud) =>(
                                        <>
                                        <ModalHeader className="flex flex-col gap-1">Ordmoln</ModalHeader>
                                        <ModalBody>
                                            <WordCloudPage id={params.id}/>
                                        </ModalBody>
                                        
                                        </>
                                    )}
                                </ModalContent>

                            </Modal>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );

}
