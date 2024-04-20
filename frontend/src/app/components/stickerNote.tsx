"use client"
import React from 'react';
import Draggable from 'react-draggable';

let sampleData = {
    [0]: {
        id: 0,
        content: "This is a sticker note!",
        position: {
            x: 100,
            y: 50
        }
    },
    [1]: {
        id: 1,
        content: "This is another sticker note!",
        position: {
            x: 11,
            y: 11
        }
    }
}

function generateStickerNotes(sampleData: any) {
    let stickerNotes = [];
    for (let i = 0; i < sampleData.length; i++) {
        stickerNotes.push(
            <Draggable defaultPosition={sampleData[i].position}>
                <div className="bg-yellow-200 p-4 aspect-square shadow-xl cursor-grab active:cursor-grabbing w-fit max-w-40 text-balance">
                    <p className="text-yellow-800">{sampleData[i].content}</p>
                </div>
            </Draggable>
        );
    }
    return stickerNotes;
}

export default function StickerNote() {
    return (
        
        <> 
        {generateStickerNotes(Object.values(sampleData))}
        </>
        
    );
};