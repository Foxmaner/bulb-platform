'use client';

import React, { useEffect, useState } from 'react';


import PageHeader from "../Components/pageHeader";
import { useSession } from 'next-auth/react';


export default function meetingPage() {
    const { data: session, status } = useSession();


    return (
        <div className='flex-col w-full bg-white'>
            <PageHeader userName="Eskil" />
            <div className="">
                <div className="bg-slate-100 text-black flex flex-wrap content-start gap-96 border-2 border-gray-200">
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



