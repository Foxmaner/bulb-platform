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
'use client';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMeetingContext } from "app/context/meetingProvider";
import { Paragraph } from "index";

interface IParagraphFormProps {
    data: Paragraph
}

export default function ParagraphForm({ data }: IParagraphFormProps) {
    const [title, setTitle] = useState<string>(data.title || "")
    const { meeting, setMeeting } = useMeetingContext();
    const [titleValue, setTitleValue] = useState("");

    const addParagraphTitle = (title: string) => {
        setTitle(title);

        setMeeting({
            ...meeting,
            sections: meeting.sections.map(section => {

                section.paragraphs?.map(paragraph => {
                    if (paragraph._id === data._id) {
                        
                        
                        paragraph.title = title
                        return {
                            ...section,
                            paragraphs: [(section.paragraphs || []), paragraph]
                        }
                    }
                })

                return section;
            })
        })
    }

    return (
        <div className="flex flex-col gap-2">
            {
                data.useTitle && (
                    <Textarea
                        variant="bordered"
                        radius="none"
                        labelPlacement="outside"
                        placeholder="Underrubrik"
                        className="flex"
                        value={title}
                        onValueChange={addParagraphTitle}
                        minRows={1}
                    />
                )
            }

            <div className="flex flex-col gap-1">
                <Textarea
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    placeholder="Skriv text här"
                    className="flex"
                    minRows={5}
                />
            </div>
            

        </div>
    )

};
