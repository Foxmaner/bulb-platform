'use client';

import { BsCalendarEvent, BsFileEarmarkTextFill, BsFillInfoCircleFill } from "react-icons/bs";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Switch } from "@nextui-org/react";

export function Sidebar() {
    const pathname = usePathname();
    
    //Detta för att inte visa sideBar på Skapasidan, en sk fulfix.
    if(pathname.includes("create")){
        return <></>;
    }

    return (
        <div className="bg-primaryGrey divide-y divide-gray-400 h-screen flex flex-col flex-shrink-0" >
            <div className='p-5'>
                <Link href="/">
                    <h1 className="text-primary font-bold text-3xl">East <br /> Sweden <br /> MedTech</h1>
                </Link>
                <div className="bg-primary h-1 w-5/6 content-center"></div>
            </div>
            <div className='p-5'>
                <h2 className="text-gray-800">Menu</h2>
                <ul>
                    <Link href="/meetings" className={`text-gray-500 font-bold text-2xl flex ${pathname.includes("/meetings") || pathname === '/' ? 'text-primary' : ''}`}> <BsCalendarEvent color={`${pathname.includes("/meetings") || pathname === '/' ? '#831843' : '#6b7280'}`} /> Meetings</Link>
                    <Link href="/documents" className={`text-gray-500 font-bold text-2xl flex ${pathname.includes("/documents") ? 'text-primary' : ''}`}> <BsFileEarmarkTextFill color={`${pathname.includes("/documents") ? '#831843' : '#6b7280'}`} /> Documents</Link>
                    <Link href="/templates" className={`text-gray-500 font-bold text-2xl flex ${pathname.includes("/templates") ? 'text-primary' : ''}`}> <BsFileEarmarkTextFill color={`${pathname.includes("/templates") ? '#831843' : '#6b7280'}`} /> Templates</Link>
                </ul>
            </div>
            <div className='bg-primary flex flex-grow'>
            </div>

            {/* Actionbar */}
            <div >
                <button className="text-gray-500 flex w-full"> <BsFillInfoCircleFill color="grey" /> Info</button>
                {
                <Switch defaultSelected >
                    <p className='text-gray-500'>Darkmode</p>
                </Switch>
                }
            </div>

            <div className='flex'>
                <Image src="/logo-1.png" alt="East Sweden MedTech" width={100} height={100} />
                <div className="width-full flex-col content-center items-center">
                    <p className='text-gray-500'>East Sweden <br></br> MedTech</p>
                    <p className='text-gray-500'>© 2024</p>
                </div>
            </div>
        </div>
    );
}


