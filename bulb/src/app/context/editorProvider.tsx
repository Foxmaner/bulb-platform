'use client';

import { Editor } from '@tiptap/react';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditorContextType {
    currentEditor: Editor | null;
    setCurrentEditor: (editor: Editor | null) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export const useCurrentEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useCurrentEditor must be used within an EditorProvider');
    }
    return context;
};

interface EditorProviderProps {
    children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [currentEditor, setCurrentEditor] = useState<Editor | null>(null);
    
    return (
        <EditorContext.Provider value={{ currentEditor, setCurrentEditor }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = () => {
	const context = useContext(EditorContext);
	if (!context) {
    	throw new Error('useEditorContext must be used within an EditorProvider');
	}

  	return context;
};