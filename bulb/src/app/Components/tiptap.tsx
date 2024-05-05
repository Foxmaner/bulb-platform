"use client";

import "./tiptap.css";

import Collaboration from "@tiptap/extension-collaboration";

import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

import { useCurrentEditor } from "../context/editorProvider";

interface ITiptapProps {
  id: string;
}

export default function Tiptap({ id }: ITiptapProps) {
  const { setCurrentEditor, provider, doc } = useCurrentEditor();

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
                name: "Anders",
                color: "#f783ac",
            },
        }),
        Placeholder.configure({
            placeholder:
                "Skriv här",
        }),
        Underline.configure({}),
    ],
});

  const handleOnFocus = () => {
    if (editor) {
      setCurrentEditor(editor);
    }
  };

  return (
    <div className="flex flex-col">
      <EditorContent className="border"onFocus={handleOnFocus} editor={editor} />
    </div>
  );
}
