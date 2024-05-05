'use client'

import StickerNote from 'app/components/StickyNotes';
import QRCodeWindow from "app/components/QrCode";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-screen h-screen">
    <StickerNote />
    <QRCodeWindow qrData={params.id} />
    </div>
  )
}
