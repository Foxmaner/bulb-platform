'use client';

import { Editor } from '@tiptap/react';
import { SocketIOProvider } from 'y-socket.io';
import { io as socketIOClient, Socket } from "socket.io-client";

import { Doc } from "yjs";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';


interface EditorContextType {
    currentEditor: Editor | null;
    setCurrentEditor: (editor: Editor | null) => void;

    provider: SocketIOProvider | null;
	socket: Socket | null;
    doc: Doc;
}

const doc = new Doc();


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
    cookie: string;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children, cookie }) => {
    const path = usePathname();
    const room = path.split("/");

    const [currentEditor, setCurrentEditor] = useState<Editor | null>(null);
    const [ provider, setProvider ] = useState<SocketIOProvider | null> (null);
    const [ socket, setSocket ] = useState<Socket | null> (null);

    useEffect(() => {
        if (room.length > 2 && room[1] === "meetings" && provider === null) {
            console.log("Creating new provider")
            const roomName = room[2];
            const currProvider = new SocketIOProvider('ws://localhost:3001', roomName, doc, {
                autoConnect: false,
                resyncInterval: 5000,
                disableBc: false
            })

            console.log("PROVIDER", currProvider !== null)
            setProvider(currProvider);
            currProvider.connect();
        }

        if (socket === null && cookie) {
            console.log("Cookie: ", cookie)
            setSocket(socketIOClient('ws://localhost:3001', {
                autoConnect: false,
                auth: {
                    cookie: `connect.sid=${cookie}`
                }
            }));
        }

        if (socket && !socket?.connected) {
            socket.connect();
            console.log("Socket connected")
            setTimeout(() => {
                console.log("Joining room:", room[2])
                socket.emit('join_room', room[2].trim())
            }, 500)
        }
    }, [provider, path, room, setSocket, socket, cookie]);

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