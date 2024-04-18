'use client'
import QRCode from "react-qr-code"
import Draggable from 'react-draggable'; // The default
import StickerNote from '../../../components/stickerNote';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <StickerNote />
  )
}