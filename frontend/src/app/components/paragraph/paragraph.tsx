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


import "./paragraph.css";

import Collaboration from "@tiptap/extension-collaboration";

import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useCallback, useEffect, useState } from "react";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

import { useUserContext } from "app/context/userProvider";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { useMeetingContext } from "app/context/meetingProvider";
import { useEditorContext } from "app/context/editorProvider";
import { VerticalDotsIcon } from "components/btn/VerticalDotBtn";
import { Paragraph } from "index";


interface IParagraphFormProps {
  data: Paragraph;
  sectionID: string;
  deleteParagraph: (editor: any, id: string) => void;
  sendDeleteParagraph: (editor: any, id: string) => void;
  select: boolean;
}

export default function ParagraphForm({
  sectionID,
  data,
  deleteParagraph,
  sendDeleteParagraph,
  select
}: IParagraphFormProps) {

  const { provider, doc, setCurrentEditor, socket } = useEditorContext();

  const [ style, setStyle ] = useState<string>("min-h-10");

  const { user } = useUserContext();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: doc,
        field: `${sectionID}.${data._id}`,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user?.name,
          color: "#f783ac",
        },
      }),
      Placeholder.configure({
        placeholder: "Skriv här...",
      }),
      Underline.configure({}),
    ],
  });

  useEffect(() => {
    socket?.on(`paragraph_${sectionID}.${data._id}_deleted`, (callbackData: any) => {
        console.log(callbackData)

        deleteParagraph(editor, data._id);
    });

    if (editor && select) {
        editor.commands.focus();
    } else {
        console.warn("EDITOR IS NULL")
    }

    return () => {
        socket?.off(`paragraph_${sectionID}.${data._id}_deleted`);
    }
  }, [socket, deleteParagraph, editor, data._id, sectionID, select])

  const handleOnFocus = useCallback(() => {
    if (editor) {
      setStyle("border-primaryText min-h-16");
      setCurrentEditor(editor);
    }
  }, [editor, setCurrentEditor, setStyle]);

  const handleOnBlur = useCallback(() => {
    setStyle("border-edge min-h-10");
  }, [setStyle]);

  const submitDeleteParagraph = useCallback(
    () => {
      const isConfirmed = window.confirm(
        "Är du säker på att du vill ta bort stycket?"
      );
      if (isConfirmed) {

        if (editor !== null) {
            sendDeleteParagraph(editor, data._id);
        } else {
            console.warn("EDITOR IS NULL")
        }
      }
    },
    [editor, sendDeleteParagraph, data._id]
  );

  if (!data._id || !provider) {
    console.warn(data);
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row gap-1 w-full relative">
        <div className="flex flex-col w-full">
          <EditorContent
            className={`${style} border-y-1`}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            editor={editor}
          />
        </div>
        <div className="absolute right-0 top-1">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-edge" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="static-actions">
              <DropdownItem>View</DropdownItem>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem onPress={submitDeleteParagraph}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
