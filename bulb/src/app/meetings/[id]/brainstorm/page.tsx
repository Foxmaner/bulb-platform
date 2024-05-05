'use client'
import QRCode from "react-qr-code"
import Draggable from 'react-draggable'; // The default
import StickerNote from '../../components/stickerNote';
import QRCodeWindow from "../../components/qrCode";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-screen h-screen">
    <StickerNote />
    <QRCodeWindow qrData={params.id} />
    </div>
  )
}