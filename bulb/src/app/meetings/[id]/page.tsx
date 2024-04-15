"use client";

import { Button, ScrollShadow } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import AddSection from "../../components/defaultAddsection";
import QuestionForm from "app/components/questionForm";
import SectionForm from "app/components/sectionForm"

import { Section } from "index"; 

import { useSectionContext } from "context/sectionProvider";


export default function createPage() {
    const { sections, setSections } = useSectionContext();

    const addSection = () => {
        setSections([...sections, { _id: "123" }])
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
                    <div className="bg-secondaryGrey h-1 w-full"></div>
                </div>

                <div className="bg-secondaryGrey h-5/6 w-1 content-center"></div>

                <div className="flex flex-col text-primaryText gap-5 w-11/12 py-5">
                    <div className="flex flex-col gap-2 ">
                        <p className="text-black text-5xl font-bold">Untitled meeting</p>
                        <p className="text-primaryText text-sm">2024 - 01 - 01</p>
                        <div className="flex flex-row bg-secondaryGrey h-1 w-11/12"></div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button className="bg-white border-2 border-edge w-4 h-6 m-2">File</Button>
                        <Button className="bg-white border-2 border-edge w-4 h-6 m-2">Edit</Button>
                        <Button className="bg-white border-2 border-edge w-4 h-6 m-2">Insert</Button>
                        <Button className="bg-white border-2 border-edge w-4 h-6 m-2">Format</Button>
                        <Button className="bg-white border-2 border-edge w-4 h-6 m-2">Help</Button>
                    </div>
                    <ScrollShadow hideScrollBar size={20}>
                        <div className="w-full h-screen">


                            {
                                sections.map((section: Section) => <SectionForm data={section} />)
                            }



                            {(sections.length == 0) && (
                                <div className="flex w-11/12 h-11/12 py-5">
                                    <AddSection addSection={addSection} />
                                </div>
                            )
                            }

                        </div>
                    </ScrollShadow>

                </div>
                <div className="flex flex-col-reverse gap-2">
                    <Button className="bg-white border-2 border-edge w-4 h-6 m-2" onClick={addSection}>Nytt avsnitt</Button>
                </div>
            </div>

        </div>

    );

}
