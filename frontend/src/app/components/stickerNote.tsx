"use client"
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

let sampleData = {
    [0]: {
        id: 0,
        content: "This is a sticker note!",
        position: {
            x: 0.5,
            y: 0.1
        }
    },
    [1]: {
        id: 1,
        content: "This is another sticker note!",
        position: {
            x: 0.1,
            y: 0.2
        }
    }
}

function onDragEvent(i: number) {
    console.log((sampleData[i].position.x).toString());
    
}


function generateStickerNotes(sampleData: any) {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
          console.log('resizing');  
          setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    let stickerNotes = [];
    for (let i = 0; i < sampleData.length; i++) {
        let position = {
            x: sampleData[i].position.x * windowSize.width,
            y: sampleData[i].position.y * windowSize.height,
          };

        stickerNotes.push(
            <Draggable defaultPosition={position} position={position} bounds="parent" onDrag={() => onDragEvent(DraggableData)}>
                <div className="bg-yellow-200 p-4 aspect-square shadow-xl cursor-grab active:cursor-grabbing w-fit max-w-40 text-balance">
                    <p className="text-yellow-800 text-sm">{sampleData[i].content}</p>
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