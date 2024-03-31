'use client';

import { BsCalendarEvent, BsFileEarmarkTextFill, BsFillInfoCircleFill } from "react-icons/bs";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Switch } from "@nextui-org/react";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="bg-slate-100 divide-y divide-gray-400 h-screen flex flex-col" >
            <div className='p-5'>
                <Link href="/">
                    <h1 className="text-pink-900 font-bold text-3xl">East <br /> Sweden <br /> MedTech</h1>
                </Link>
                <div className="bg-pink-900 h-1 w-5/6 content-center"></div>
            </div>
            <div className='p-5'>
                <h2 className="text-gray-800">Menu</h2>
                <ul>
                    <Link href="/meetings" className={`text-gray-500 font-bold text-2xl flex ${pathname === '/meetings' || pathname === '/' ? 'text-pink-900' : ''}`}> <BsCalendarEvent color={`${pathname === '/meetings' || pathname === '/' ? '#831843' : '#6b7280'}`} /> Meetings</Link>
                    <Link href="/documents" className={`text-gray-500 font-bold text-2xl flex ${pathname === '/documents' ? 'text-pink-900' : ''}`}> <BsFileEarmarkTextFill color={`${pathname === '/documents' ? '#831843' : '#6b7280'}`} /> Documents</Link>
                    <Link href="/templates" className={`text-gray-500 font-bold text-2xl flex ${pathname === '/templates' ? 'text-pink-900' : ''}`}> <BsFileEarmarkTextFill color={`${pathname === '/templates' ? '#831843' : '#6b7280'}`} /> Templates</Link>
                </ul>
            </div>
            <div className='bg-pink-900 flex flex-grow'>
            </div>

            {/* Actionbar */}
            <div >
                <button className="text-gray-500 flex w-full"> <BsFillInfoCircleFill color="#6b7280" /> Info</button>
                {
                <Switch defaultSelected >
                    <p className='text-gray-500'>Darkmode</p>
                </Switch>
                }
            </div>

            <div className='flex'>
                <Image src="/placeholder.jpg" alt="East Sweden MedTech" width={100} height={100} />
                <div>
                    <p className='text-gray-500'>East Sweden MedTech</p>
                    <p className='text-gray-500'>© 2024</p>
                </div>
            </div>
        </div>
    );
}


