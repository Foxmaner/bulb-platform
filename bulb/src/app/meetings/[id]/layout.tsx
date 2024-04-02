'use client';

import { useEffect, useState } from 'react';


interface layoutProps {
    children: React.ReactNode;
}

export default function LayoutPage({ children }: layoutProps) {
    const [isClient, setIsClient] = useState(false);



    useEffect(() => {
        setIsClient(true);
    }, []);

    return (

        <div className="relative">
            {isClient && (
                <>
                    <div className='relative z-10'>
                        {children}
                    </div>
                    <div className="absolute top-0 left-0 -z-1 w-screen h-screen">
                        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {Array.from({ length: window.innerWidth / 16 }).map((_, index) => {
                                return <rect key={index} x={(index * 16) + 4} y="0" width="2" height="100%" fill="#D9D9D9" />;
                            })}
                        </svg>
                    </div>
                </>
            )}

        </div>
    );
}
