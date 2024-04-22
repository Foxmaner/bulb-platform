/*
Tiptap är till toolbaren på mötessidan 

*/


'use client'

import{useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Tiptap({
  text,
  onChange,
}: {
  text:string
  onChange:(richText:string)=> void
  }){
    const editor = useEditor({
      extensions:[StarterKit.configure()],
      content: text,
      editorProps:{
        attributes:{
          class: "rounded-md border min-h-[150px] border-input bg-black disabled:cursor-not-allowed disabled:opacity-50"
        },
      },
      onUpdate({editor}){
        onChange(editor.getHTML())
      },
    })
    return(
      <div className='flex flex-col justify-stretch min-h-[250px]'>
       
        <EditorContent editor={editor}/>
      </div>
    )
  }