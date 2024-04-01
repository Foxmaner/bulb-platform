import type { NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

const protectedRoutes = [
    '/documents',
    '/templates',
    '/meetings'
];

export async function middleware(req: NextRequest) {
    const requestForNextAuth = {
        headers: {
          cookie: req.headers.get('cookie') ?? undefined,
        }, 
    };

    const session = await getSession({ req: requestForNextAuth });

    const pathname = req.nextUrl.pathname.toLocaleLowerCase();

    if (session) {
        if (pathname.startsWith('/auth/signIn')) {
            return NextResponse.redirect(new URL('/document', req.nextUrl.origin));
        }

        return NextResponse.next();
    } else {
        if (protectedRoutes.some(protectedRoute => pathname.startsWith(protectedRoute))) {
            return NextResponse.redirect(new URL('/auth/signIn', req.nextUrl.origin));
        }
    }

    return NextResponse.next();
}
