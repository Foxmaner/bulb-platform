import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { getSession } from "next-auth/react"

import jwksClient from "jwks-rsa";


dotenv.config();

const client = jwksClient({
    jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
});


function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err || !key) {
            callback(err, null);
            return;
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

async function verifyGoogleSignUp(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers["authorization"]?.split(" ")[1].trim();
    
    console.log("Token:", token);
    
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) {
            console.log("Token cannot be verified", err);
            return res.status(401).send("Invalid Token");
        }

        next();
    });
}

async function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const token = await getSession({ req });

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    next();
}

export { verifyGoogleSignUp, verifyToken }

