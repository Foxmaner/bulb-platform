"use client"
import React from 'react';
import Draggable from 'react-draggable';

export default function StickerNote() {
    return (
        <Draggable defaultPosition={{x: 0, y: 0}}>
            <div className="bg-yellow-200 p-4 aspect-square shadow-xl cursor-grab active:cursor-grabbing">
                <p className="text-yellow-800">This is a sticker note!</p>
            </div>
        </Draggable>
    );
};