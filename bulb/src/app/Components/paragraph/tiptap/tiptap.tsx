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

import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import Placeholder from "@tiptap/extension-placeholder";

import { useCurrentEditor } from '../../../context/editorProvider';


interface ITiptapProps {
  id: string;
}

export default function Tiptap({ id }: ITiptapProps) {

  const { setCurrentEditor, provider, doc } = useCurrentEditor();

  if (doc === null) {
    throw new Error('doc is null');
  }
  if (provider === null) {
    throw new Error('provider is null');
  }

  const editor = useEditor({
      content: doc,
      extensions: [
          Document, 
          Paragraph, 
          Text, 
          BulletList.configure({
            keepAttributes: true,
          }),
          ListItem,
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
      <button
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={editor?.isActive('bulletList') ? 'is-active' : ''}
      >test </button>
      <EditorContent onFocus={handleOnFocus} editor={editor} />
    </div>
  )
}