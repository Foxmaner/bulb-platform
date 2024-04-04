import PageHeader from "../components/pageHeader"
import Link from "next/link"

export default function meetingPage() {
    return (
        <div className='flex-col w-full bg-white'>
            <PageHeader userName="Eskil" />
            <div className="">
                <div className="bg-primaryGrey text-black flex flex-wrap content-start gap-96 border-2 border-gray-200">
                    <div className="text-black cursor-pointer p-2">Möte</div>
                    <div className="text-black cursor-pointer p-2">Datum</div>
                    <div className="text-black cursor-pointer p-2">Medlemmar</div>
                </div>
                <div className="text-black flex flex-wrap content-start gap-80 p-2">
                    <p>Exempelmöte</p>
                    <p>2024/01/01</p>
                    <p>AL, EB</p>
                </div>
            </div>
        </div>
    );
}



