'use client';

import { Editor } from '@tiptap/react';
import { SocketIOProvider } from 'y-socket.io';
import { io as socketIOClient, Socket } from "socket.io-client";

import { Doc } from "yjs";

import React, { createContext, useContext, useState, ReactNode } from 'react';


interface EditorContextType {
    currentEditor: Editor | null;
    setCurrentEditor: (editor: Editor | null) => void;

    provider: SocketIOProvider;
	socket: Socket;
    doc: Doc;
}

const doc = new Doc();
const socket = socketIOClient('ws://localhost:1234', {
    autoConnect: false
});
const provider = new SocketIOProvider('ws://localhost:1234', 'room-name', doc, {
    autoConnect: false,
    resyncInterval: 5000,
    disableBc: false
})

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
    if (!socket.connected) {
        socket.connect();
    }
    provider.connect();
    
    const [currentEditor, setCurrentEditor] = useState<Editor | null>(null);
    
    const value = {
        currentEditor,
        setCurrentEditor,
        provider,
        socket,
        doc
    }

    return (
        <EditorContext.Provider value={value}>
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