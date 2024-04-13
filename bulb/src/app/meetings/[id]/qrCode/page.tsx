
import QRCodeWindow from "../../../components/qrCode";

export default function Page({ params }: { params: { id: string } }) {
    return (
     <div className="w-screen h-screen">
          <QRCodeWindow qrData={params.id} />
     </div> 
    
    )
  }