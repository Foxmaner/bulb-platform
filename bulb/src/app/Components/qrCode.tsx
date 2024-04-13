import QRCode from "react-qr-code"
export default function Page({ qrData }: { qrData: string }) {
    return (
        <div className="absolute bottom-0 right-0 p-3 bg-slate-500 flex">
            <QRCode value={qrData} />
            <div className="flex-col content-center content">
                <p>Code</p>
                <p>{qrData}</p>
            </div>
        </div>
    )
}