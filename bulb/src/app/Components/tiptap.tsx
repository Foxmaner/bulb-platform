/*
Tiptap är till toolbaren på mötessidan 

*/


'use client'


import './tiptap.css';

import Collaboration from "@tiptap/extension-collaboration";

import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

import Placeholder from "@tiptap/extension-placeholder";

import { useCurrentEditor } from '../context/editorProvider';


interface ITiptapProps {
  id: string;
}

export default function Tiptap({ id }: ITiptapProps) {

  console.log("AAAAAAAAAAAAnders!!!!!!!!", id)

  const { setCurrentEditor, provider, doc } = useCurrentEditor();


  const editor = useEditor({
      extensions: [
          StarterKit.configure({
              history: false
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
                  "Write something … Itll be shared with everyone else looking at this example.",
          }),
      ],
  });

  const handleOnFocus = () => {
    if (editor) {
      setCurrentEditor(editor)
    }
  }

  return (
    <div className='flex flex-col'>
      <EditorContent onFocus={handleOnFocus} editor={editor} />
    </div>
  )
}