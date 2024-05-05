"use client";

import "./tiptap.css";

import Collaboration from "@tiptap/extension-collaboration";

import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useCallback, useState } from "react";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

import { useCurrentEditor } from "../../../context/editorProvider";
import { useUserContext } from "app/context/userProvider";


interface ITiptapProps {
  id: string;
}

export default function Tiptap({ id }: ITiptapProps) {
  const { setCurrentEditor, provider, doc } = useCurrentEditor();
  const [ style, setStyle ] = useState<string>("min-h-10");
  const { user } = useUserContext();

  const editor = useEditor({
    extensions: [
        StarterKit.configure({
          history:false,
        }),
        Collaboration.configure({
            document: doc,
            field: id
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

  const handleOnFocus = useCallback(() => {
    if (editor) {
      setStyle("border-primaryText min-h-16")
      setCurrentEditor(editor);
    }
  }, [editor, setCurrentEditor, setStyle]);

  const handleOnBlur = useCallback(() => {
    setStyle("border-edge min-h-10")
  }, [setStyle]);

  return (
    <div className="flex flex-col w-full">
      <EditorContent className={`${style} border-y-1`} onBlur={handleOnBlur} onFocus={handleOnFocus} editor={editor} />
    </div>
  );
}
