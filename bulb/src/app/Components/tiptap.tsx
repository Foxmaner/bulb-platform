/*
Tiptap är till toolbaren på mötessidan 

*/


'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toolbar } from './toolbar'


import { useCurrentEditor } from '../context/editorProvider';


interface ITiptapProps {
  text: string;
  onChange: (newText: string) => void;

}


export default function Tiptap({ text, onChange }:
  {
    text: string
    onChange: any
  }) {

  const { currentEditor, setCurrentEditor } = useCurrentEditor();

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: text,
    onUpdate: ({ editor }) => {
      onChange(editor.getText())
    },
  })

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