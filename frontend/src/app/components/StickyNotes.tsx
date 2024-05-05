"use client"

import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Editor } from '@tiptap/react';

import { Socket } from "socket.io-client";
import { useCurrentEditor } from '../context/editorProvider';
import { useMeetingContext } from '../context/meetingProvider';

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
const [data, setData] = useState([]);
interface Position { 
  id: number,
  content: string,
  position: { 
    x: number; 
    y: number; 
  }; 
}


function GenerateStickerNotes(sampleData: any, meetingID: any,) {
    const { meeting } = useMeetingContext();
    const { socket } = useCurrentEditor();

    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [positions, setPositions] = useState<Position[]>(sampleData);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const newWindowSize = { width: window.innerWidth, height: window.innerHeight };
                const widthRatio = newWindowSize.width / windowSize.width;
                const heightRatio = newWindowSize.height / windowSize.height;
        
                const newPositions = positions.map((pos: Position) => ({
                  ...pos,
                  position: {
                    x: pos.position.x * widthRatio,
                    y: pos.position.y * heightRatio,
                  }
                }));
                setPositions(newPositions);
                setWindowSize(newWindowSize);
              }
        };

        const handleNotesMove = (data: any) => {
          console.log("9999", data);

          const oldPos = positions.find(position => position.id !== data.answerID);

          if (oldPos === undefined) return;

          const newPos: Position = {
            ...oldPos,
            position : {
              x: data.xPos * windowSize.width,
              y: data.yPos * windowSize.height,
            }
          }

          setPositions([...positions.filter(position => position.id !== data.answerID), newPos]);
        }

        socket?.on("notes_moved", handleNotesMove)
    
        window.addEventListener('resize', handleResize);
        // @ts-ignore
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [positions, windowSize.height, windowSize.width]);

    let stickerNotes:any = [];
    positions.map((position: Position, index:any) => (
        stickerNotes.push(
        <Draggable
          defaultPosition={position.position}
          position={position.position}
          bounds="parent"
          onStop={(event: any, data: any) => onStopEvent(event, data, index)}
          onDrag={(event: any, data: any) => onDragEvent(event, data, index)}
        >
          <div className="bg-yellow-200 p-4 aspect-square shadow-xl cursor-grab active:cursor-grabbing w-fit max-w-40 text-balance">
            <p className="text-yellow-800 text-sm">{sampleData[index]?.content}</p>
          </div>
        </Draggable>
        )
      ))



    function onStopEvent(event: any, data: any, index: any) {
        const newPositions = [...positions];
        
        const newPos: Position = { 
          ...newPositions[index],
            position: {
              x: data.x, 
              y: data.y,
          }
        };
        newPositions[index] = newPos;
      
        setPositions(newPositions);
        socket?.emit('notes_movement', {
          meetingID: '1',
          answerID: sampleData[index].id,
          xPos: data.x / windowSize.width,
          yPos: data.y / windowSize.height,
        });
    }

    function onDragEvent(event: any, data: any, index: any) {
      console.log("bear is dragging this project to the ground")

      
    }
    return stickerNotes;

}

export default function StickerNote({meetingID}: {meetingID: {id: string}}) {
      console.log(meetingID.id) 
    return (
        
        <> 
        {GenerateStickerNotes(Object.values(sampleData), meetingID)}
        </>
        
    );
};
