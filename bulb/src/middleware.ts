import type { NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

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

    const pathname = req.nextUrl.pathname.toLocaleLowerCase();

    if (!routes.some(route => pathname.startsWith(route))){
        console.log(pathname);
        return NextResponse.next();
    }

    const response = await fetch('http://localhost:3001/verify', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    let authorized = false;
    if (response.status === 200) {
        authorized = true;
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

