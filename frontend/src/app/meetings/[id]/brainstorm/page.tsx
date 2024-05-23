'use client'

import StickerNote from 'app/components/StickyNotes';
import QRCodeWindow from "app/components/QrCode";



export default function Page({ params }: { params: { id: any } }) {
  return (
    <div className="w-screen h-screen">
      <StickerNote meetingID={params.id} />
      <QRCodeWindow qrData={params.id} />
    </div>
  )
}
