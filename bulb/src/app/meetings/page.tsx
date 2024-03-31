import PageHeader from "../components/pageHeader"


export default function meetingPage(){
    return(
        <div className='flex-col w-full bg-white'>
            <PageHeader userName = "Eskil" />
            <div className="bg-slate-100 text-black flex justify-between h-10 border-2 border-gray-200">
                    <div className="text-black cursor-pointer p-2">Möte</div>
                    <div className="text-black cursor-pointer p-2">Datum</div>
                    <div className="text-black cursor-pointer p-2">Medlemmar</div>
                </div>
                <div className="text-black flex justify-between">
                    <p>Exempelmöte</p>
                    <p>2024/01/01</p>
                    <p>AL, EB</p>
                </div>
        </div>
    );
}



