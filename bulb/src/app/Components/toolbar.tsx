"use client"

import { type Editor } from "@tiptap/react"
import { toggle } from "@nextui-org/react"


interface IeditorProps{
    editor: Editor | null
}

export function Toolbar({editor}: IeditorProps){
    if(!editor){
        return null
    }


    return(
        <div></div>
    )




}