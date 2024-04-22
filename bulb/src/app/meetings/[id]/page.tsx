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

import { Button, ScrollShadow, ButtonGroup, Tooltip, Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import AddSection from "../../components/defaultAddsection";

import SectionForm from "app/components/sectionForm"

import { Section, Paragraph } from "index";

import { useMeetingContext } from "../../context/meetingProvider";
import Tiptap from "app/components/tiptap";
import { Toolbar } from "app/components/toolbar";


export default function MeetingPage() {
    const { meeting, setMeeting } = useMeetingContext();

    const addSection = () => {
        //testa det här sen
        const id = meeting.sections.length
        const newSection = {
            _id: "",
            title: '',
            paragraphs: []
        }

        setMeeting({ ...meeting, sections: [...meeting.sections, newSection] })
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
                                    <div className="flex items-center flex-col">
                                        <Tooltip content={section.title} isDisabled={!section.title}>
                                            <Button variant="light" className="w-36 underline" key={index}>
                                                <p className="truncate">
                                                    {section.title}
                                                </p>
                                            </Button>
                                        </Tooltip>
                                        {section.paragraphs?.map((paragraph: Paragraph, paragraphIndex: number) =>
                                            <Tooltip content={paragraph.title} isDisabled={!paragraph.title}>
                                                <Button variant="light" className="w-28 underline" key={paragraphIndex}>
                                                    <p className="truncate">
                                                        {paragraph.title}
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
                    <div className="flex flex-col gap-2 ">
                        <Input variant="underlined" size="lg" disableAnimation={true} radius="lg" type={meeting.title} placeholder="Tomt möte" isRequired={true}></Input>
                        <p className="text-primaryText text-sm">2024 - 01 - 01</p>
                        <div className="flex flex-row bg-secondaryGrey h-1 w-11/12"></div>
                    </div>
                    <div className="flex flex-row gap-2">
                        
                        <Button variant="solid" className="bg-primaryGrey border-2 border-edge" onClick={addSection}>Nytt avsnitt</Button>
                        

                    </div>
                    
                    <ScrollShadow hideScrollBar size={20}>
                        <div className="w-full h-screen">
                            {
                                meeting.sections.map((section: Section, index: number) => <SectionForm key={index} data={section} />)
                            }
                            {
                                (meeting.sections.length == 0) && (
                                    <div className="flex w-11/12 h-11/12 py-5">
                                        <AddSection addSection={addSection} />
                                    </div>
                                )
                            }

                        </div>
                    </ScrollShadow>

                </div>

            </div>

        </div>

    );

}
