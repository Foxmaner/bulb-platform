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
    '/documents',
    '/templates',
    '/meetings',
    '/auth/signin'
]

const protectedRoutes = [
    '/documents',
    '/templates',
    '/meetings'
];

export async function middleware(req: NextRequest) {
    const cookieHeader = req.headers.get("cookie") || '';

    const connectSid = parse(cookieHeader)['connect.sid'];

    const pathname = req.nextUrl.pathname.toLocaleLowerCase();

    if (!routes.some(route => pathname.startsWith(route))){
        return NextResponse.next();
    }

    let authorized = false;
        if (connectSid) {
        const response = await fetch('http://localhost:3001/history/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `connect.sid=${connectSid}`
            }
        })
        
        if (response.status === 200) {
            authorized = true;
        }
    }

    if (authorized) {
        if (pathname === '/auth/signin') {
            return NextResponse.redirect(new URL('/meetings', req.nextUrl.origin));
        }

        return NextResponse.next();
    } else {
        if (protectedRoutes.some(protectedRoute => pathname.startsWith(protectedRoute))) {
            return NextResponse.redirect(new URL('/auth/signIn', req.nextUrl.origin));
        }
    }

    return NextResponse.next();
}

