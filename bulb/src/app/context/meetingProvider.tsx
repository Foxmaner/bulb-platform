/**
 * MeetingProvider Component
 * 
 * This component provides a context for managing the meeting data throughout the application.
 * It wraps the entire application with the MeetingContext, allowing components to access and update the meeting data.
 * 
 * Props:
 * - children: ReactNode - The child components wrapped by the MeetingProvider.
 * 
 * Usage:
 * <MeetingProvider>
 *   <App />
 * </MeetingProvider>
 * 
 * Note: This component should be placed at the top level of the component tree to provide access to the meeting context across the entire application.
 */

'use client';

import Quill from "quill";

import { Toolbar } from "app/components/toolbar";
import { Section, Meeting } from "index";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorageState } from "app/hooks/useLocalStorageState";


type MeetingContextType = {
    meeting: Meeting;
    setMeeting: React.Dispatch<React.SetStateAction<Meeting>>;

	editorInstanceRef: React.RefObject<any> | null;
	editorTempHolder: React.RefObject<HTMLDivElement> | null;
	editorRef: React.RefObject<HTMLDivElement> | null;
	toolbarRef: React.RefObject<HTMLDivElement> | null;
	
	activateEditor: (paragraph: Editable, activate: boolean) => void;
	activeParagraph: string | null;
	setActiveParagraph: React.Dispatch<React.SetStateAction<string | null>>;
};

const defaultMeeting: Meeting = {		
    _id: '',
	title:"",
    sections: [],
	
}

const MeetingContext = createContext<MeetingContextType>({
    meeting: defaultMeeting,
    setMeeting: (): any => { },

	editorInstanceRef: null,
	editorTempHolder: null,
	editorRef: null,
	toolbarRef: null,

	activeParagraph: null,
	activateEditor: (): any => {},
	setActiveParagraph: (): any => {}
});

interface MeetingProviderProps {
  	children: React.ReactNode;
	editorTempHolder: React.RefObject<HTMLDivElement>;
	editorRef: React.RefObject<HTMLDivElement>;
	toolbarRef: React.RefObject<HTMLDivElement>;
};

type Editable = {
    id: string;
    content: string;
};

export const MeetingProvider: React.FC<MeetingProviderProps> = ({ 
	children,
	editorTempHolder,
	editorRef,
	toolbarRef
}) => {
	const editorInstanceRef = React.useRef<any>(null);

	const [meeting, setMeeting] = useState<Meeting>(defaultMeeting);	
	const [activeParagraph, setActiveParagraph] = useState<string | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorInstanceRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: toolbarRef.current
                }
            });
        }
    }, []);

    const activateEditor = (paragraph: Editable, activate: boolean) => {
        const editorInstace = editorInstanceRef?.current;

        if (activate && editorInstace) {
            editorInstace.root.innerHTML = paragraph.content;
            setActiveParagraph(paragraph.id);
            setTimeout(() => {
                editorInstace.setSelection(
                    { index: 0, length: editorInstace.getLength() - 1 },
                    "api"
                );
            });
        } else {
            const quillEditorTemp = editorTempHolder.current;
            const quillEditor = editorInstanceRef.current;
            if (quillEditorTemp && quillEditor) {
                quillEditorTemp.appendChild(quillEditor);
                setActiveParagraph(null);
            }
        }
    }

	const value = {
		meeting,
		setMeeting,

		editorTempHolder,
		editorInstanceRef,
		editorRef,
		toolbarRef,

		activateEditor,
		activeParagraph,
		setActiveParagraph
	};

	return (
		<MeetingContext.Provider value={value}>
	    	{children}
    	</MeetingContext.Provider>
	);
};

export const useMeetingContext = () => {
	const context = useContext(MeetingContext);
	if (!context) {
    	throw new Error('useSectionContext must be used within an SectionProvider');
	}

  	return context;
};
