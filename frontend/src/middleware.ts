import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { parse } from 'cookie';


/**
 * Middleware to check if the user is authenticated
 * 
 * Before it routes, it sends a request to the server to check if the user is authenticated.
 * This doesnt give the user any information about the user, it just checks if the user is authenticated.
 * And if the user is not authenticated, it redirects the user to the login page.
*/

const routes = [
    '/templates',
    '/meetings',
    '/auth/signin'
]

const protectedRoutes = [
    '/templates',
    '/meetings',
    '/organisation',
    '/admin',
    '/careneeds',
    '/calendar',
];

export async function middleware(req: NextRequest) {
    const cookieHeader = req.headers.get("cookie") || '';
    const cookies = parse(cookieHeader);
    const connectSid = cookies['connect.sid'];

    const pathname = req.nextUrl.pathname.toLocaleLowerCase();
    
    if (!routes.some(route => pathname.startsWith(route) && pathname !== "/")){
        return NextResponse.next();
    }

    let authorized = false;
    if (connectSid) { 
        const response = await fetch('http://localhost:3001/verify', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `connect.sid=${connectSid}`,
                'Referer': pathname
            }
        });

        if (response.status === 200) {
            authorized = true;
        }
    }

    if (authorized) {
        if (pathname === '/login' || pathname === '/') {
            const response = NextResponse.redirect(new URL('/meetings', req.nextUrl.origin))
            return response;
        }

        return NextResponse.next();
    } else {
        if (protectedRoutes.some(protectedRoute => pathname.startsWith(protectedRoute))) {
            return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
        }
    }
}


export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}
