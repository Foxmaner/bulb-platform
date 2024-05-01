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

import { useState, useRef, useEffect } from "react";
import { useMeetingContext } from "app/context/meetingProvider";

import { Paragraph } from "index";
import Editor from "./editor";

interface IParagraphFormProps {
  data: Paragraph;
}

interface TextareaRef {
    [key:string]: React.MutableRefObject<any>;
}

export default function ParagraphForm({ data }: IParagraphFormProps) {
  const [title, setTitle] = useState<string>(data.title || "");
  const { meeting, setMeeting } = useMeetingContext();
  const [text, setTextValue] = useState<string>(data.content || "");
  const textareaRefs = useRef<TextareaRef>({});

  const addTextAreaRef = (id:string) =>(ref: React.MutableRefObject<any>) => {
    textareaRefs.current[id] = ref;
  }

  const focusTextarea = (id:string) =>{
    const textareaRef = textareaRefs.current[id]
    if(textareaRef){
        textareaRef.current?.focus()
    }
  }

  useEffect(() => {
    textareaRefs.current = {};
  }, [data])


  /*const addParagraphTitle = (title: string) => {
    setTitle(title);

    setMeeting({
      ...meeting,
      sections: meeting.sections.map((section) => {
        section.paragraphs?.map((paragraph) => {
          if (paragraph.id === data.id) {
            paragraph.title = title;
            return {
              ...section,
              paragraphs: [section.paragraphs || [], paragraph],
            };
          }
        });

        return section;
      }),
    });
  };*/

  const addParagraphText = (text: string) => {
    setTextValue(text);

    setMeeting({
      ...meeting,
      sections: meeting.sections.map((section) => {
        section.paragraphs?.map((paragraph) => {
          if (paragraph.id === data.id) {
            paragraph.content = text;
            return {
              ...section,
              paragraphs: [section.paragraphs || [], paragraph],
            };
          }
        });

        return section;
      }),
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {data.useTitle && (
        <div className="border-solid rounded border">
          {/*<Textarea
            
            variant="bordered"
            radius="none"
            labelPlacement="outside"
            placeholder="Underrubrik"
            className="flex"
            value={title || ""}
            onValueChange={addParagraphTitle}
            minRows={1}
          />*/}
      </div>
      )}
      <div className="flex flex-col gap-1 border-solid rounded border h-22">
        <Editor
          content={text}
          id={data.id}
        />
      </div>
    </div>
  );
}
