"use client";

import { useMeetingContext } from "app/context/meetingProvider";
import React, { useCallback, useRef, useEffect, useId, useState } from "react";


type Editable = {
    id: string;
    content: string;
};

interface EditorProps {
    content: string,
    id: string
}

export default function Editor({ content, id }: EditorProps) {
    const meetingContext = useMeetingContext();

    if (meetingContext.editorRef)
        return

    const contentEl = useRef<HTMLDivElement>(null);
    const quillEditorParent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentEl.current) {
            contentEl.current.innerHTML = content;
        }
    }, [content]);


	useEffect(() => {
        if (quillEditorParent.current && contentEl.current) {
            const isActive = meetingContext.activeParagraph === id;
            if (isActive && quillEditorParent.current && meetingContext.editorRef?.current) {
                quillEditorParent.current.appendChild(meetingContext.editorRef.current);
            }

            quillEditorParent.current.style.display = isActive ? "block" : "none";
            contentEl.current.style.display = isActive ? "none" : "block";
        }
    }, [meetingContext]);


    useEffect(() => {
        const isActive = meetingContext.activeParagraph === id;
    	if (isActive) {
    		const onKeyUp = (event: any) => {
    			if (event.code === 'Escape') {
					meetingContext.activateEditor({ id, content }, false);
				}
			};

    		document.addEventListener('keyup', onKeyUp);
    		return () => document.removeEventListener('keyup', onKeyUp);
		}
	}, [meetingContext]);

    return (
        <div
            className="editable"
            id={id}
            style={{
                position: "relative",
                flexGrow: 1,
				flexBasis: 0,
                width: 0
            }}
            onDoubleClick={() => meetingContext.activateEditor({ id, content }, true)}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "none"
                }}
                ref={quillEditorParent}
            ></div>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "2rem"
                }}
                ref={contentEl}
            ></div>
        </div>
    );
}