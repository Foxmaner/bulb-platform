"use client"

import { Editor } from "@tiptap/react";
import { useEditorContext } from "app/context/editorProvider";



export function Toolbar() {
    const { currentEditor, setCurrentEditor } = useEditorContext();
    
    const handleBold = () => {
        if (!currentEditor) return;

        currentEditor.chain().focus().toggleBold().run()
    }

    return (
        <div className="">
            <button 
                onClick={handleBold}
                disabled={currentEditor === null}
                className={currentEditor?.isActive('bold') ? 'is-active' : ''}>
                bold
            </button>
        </div>
    )




}