
import Link from "next/link";

export default function createPage() {

    return (
        
        <div className="flex w-screen h-screen content-center justify-center items-center">
            <div className="flex flex-row gap-10 bg-white w-[calc(90%)] h-[calc(90%)] ">
                {/*Vänstra div den med loggan*/}
                <div className="flex flex-col text-black">
                    <div className='p-5'>
                        <Link href="/">
                            <h1 className="text-pink-900 font-bold text-3xl">East <br /> Sweden <br /> MedTech</h1>
                        </Link>
                        <div className="bg-pink-900 h-1 w-5/6 content-center"></div>
                    </div>
                </div>

                <div className="flex text-black">hihi</div>
                <div className="flex text-black">hihi</div>
            </div>
        </div>
    );
}