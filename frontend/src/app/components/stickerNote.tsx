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



function GenerateStickerNotes(sampleData: any) {
    
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [positions, setPositions] = useState(sampleData.map((item: { position: { x: number; y: number; }; }) => ({
        x: item.position.x * windowSize.width,
        y: item.position.y * windowSize.height,
      })));

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const newWindowSize = { width: window.innerWidth, height: window.innerHeight };
                const widthRatio = newWindowSize.width / windowSize.width;
                const heightRatio = newWindowSize.height / windowSize.height;
        
                const newPositions = positions.map((position: { x: number; y: number; }) => ({
                  x: position.x * widthRatio,
                  y: position.y * heightRatio,
                }));
        
                setPositions(newPositions);
                setWindowSize(newWindowSize);
              }
          

        };
    
        window.addEventListener('resize', handleResize);
    // @ts-ignore
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    let stickerNotes:any = [];
    positions.map((position:any, index:any) => (
        stickerNotes.push(
        <Draggable
          defaultPosition={position}
          position={position}
          bounds="parent"
          onStop={(event, data) => onStopEvent(event, data, index)}
        >
          <div className="bg-yellow-200 p-4 aspect-square shadow-xl cursor-grab active:cursor-grabbing w-fit max-w-40 text-balance">
            <p className="text-yellow-800 text-sm">{sampleData[index].content}</p>
          </div>
        </Draggable>
        )
      ))

    function onStopEvent(event: any, data: any, index: any) {
        const newPositions = [...positions];
        newPositions[index] = { x: data.x, y: data.y };
        setPositions(newPositions);
    }
    return stickerNotes;
}

export default function StickerNote() {
    return (
        
        <> 
        {GenerateStickerNotes(Object.values(sampleData))}
        </>
        
    );
};