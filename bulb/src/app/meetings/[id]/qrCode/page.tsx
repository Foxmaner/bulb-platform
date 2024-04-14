import QRCode from "react-qr-code"
export default function Page({ params }: { params: { id: string } }) {
    return (
    <QRCode className="w-full" value={params.id} />
    )
  }