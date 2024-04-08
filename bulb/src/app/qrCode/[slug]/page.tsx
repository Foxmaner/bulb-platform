import QRCode from "react-qr-code"
export default function Page({ params }: { params: { slug: string } }) {
    return <QRCode value={params.slug} />
  }