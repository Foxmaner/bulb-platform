/**
 * ParagraphForm Component
 *
 * This component renders a form for adding/editing a paragraph within a section.
 * It allows users to input paragraph text and optionally a title for the paragraph.
 *
 * Props:
 * - data: Paragraph - The data for the paragraph including title, text, and _id.
 *
 * Usage:
 * <ParagraphForm data={paragraphData} />
 */
"use client";

import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Textarea,
} from "@nextui-org/react";

import { useState, useRef, useCallback } from "react";
import { useMeetingContext } from "app/context/meetingProvider";
import { useEditorContext } from "app/context/editorProvider";
import { VerticalDotsIcon } from "components/btn/VerticalDotBtn";
import { Paragraph } from "index";
import Tiptap from "./tiptap/tiptap";


interface IParagraphFormProps {
    data: Paragraph;
    sectionID: string;
}

export default function ParagraphForm({
    sectionID,
    data,
}: IParagraphFormProps) {
    const [title, setTitle] = useState<string>(data.title?.text || "");
    const { meeting, setMeeting } = useMeetingContext();
    const [text, setTextValue] = useState<string>(data.body.text || "");

    const { provider, doc } = useEditorContext();

    /*const addParagraphTitle = (title: string) => {
        setTitle(title);

        setMeeting({
            ...meeting,
            sections: meeting.sections.map((section) => {
                section.contains?.map((paragraph) => {
                    if (paragraph._id === data._id) {
                        paragraph.title = title;
                        return {
                            ...section,
                            contains: [section.contains || [], paragraph],
                        };
                    }
                });

                return section;
            }),
        });
    };*/


    const deleteParagraph = useCallback((id: string) => {
        const isConfirmed = window.confirm("Är du säker på att du vill ta bort stycket?");
        if (isConfirmed) {
            console.log(doc.share)
            console.log("9999", `${sectionID}.${id}`)

            doc.share.delete(id);

            setMeeting(prevMeeting => ({
                ...prevMeeting,
                sections: prevMeeting.sections.map(section => {
                    if (section._id === sectionID) {
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
    }, [setMeeting])
    
    if (!data._id || !provider) {
        return <></>;
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row gap-1 w-full relative">
                <Tiptap id={`${sectionID}.${data._id}`} />
                <div className="absolute right-0 top-1">
                    <Dropdown >
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <VerticalDotsIcon className="text-edge" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="static-actions">
                            <DropdownItem>View</DropdownItem>
                            <DropdownItem>Edit</DropdownItem>
                            <DropdownItem onPress={()=>deleteParagraph(data._id)}>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
