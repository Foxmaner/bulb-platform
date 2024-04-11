import { NextRequest, NextResponse } from "next/server";
import { getToken} from "next-auth/jwt";


type reqBody = {
    url: string;
    options: {
        method: string;
        headers?: { [key: string]: string };
        body: any;
    };
}

async function handler(
    req: NextRequest
) {
    const token = await getToken({ req });

    if (!token) {
        return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const body = await req.json() as reqBody;

    if (!body) {
        return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    if (!body.url) {
        return NextResponse.json({ message: "Invalid url" }, { status: 400 });
    }

    if (!body.options.method) {
        return NextResponse.json({ message: "Invalid method" }, { status: 400 });
    }

    try {
        const headers = {
            ...body.options.headers, 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.id_token}`
        };

        const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
        const url = `${backendUrl}${body.url}`;

        const response = await fetch(
            url,
            { 
                method: body.options.method, 
                headers,
                body: JSON.stringify(body.options.body)
            }
        );

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}


export { handler as POST };