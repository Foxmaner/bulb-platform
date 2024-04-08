import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import jwksClient, { JwksClient } from 'jwks-rsa';


dotenv.config();

const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'wrong';
console.log(CLIENT_SECRET);

const client = jwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs'
});

function getKey(header, callback){
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey()
    callback(null, signingKey);
  });
}

export default function verifyToken (token : string) {
  console.log(token)
  if (!token) {
    return false;
  }
  const decoded = jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.log('Token cannot be verified', err);
      return;
    }
    console.log('Decoded JWT:', decoded);
    // Proceed with the decoded token (decoded is the payload of the JWT)
  });
  console.log(decoded);
}
//
//export default function verifyToken (req: Request, res: Response, next: NextFunction) {
//    const token : any = req.headers['access-token'];
//    if (!token) {
//      return res.status(403).send({auth: false, message: 'No token provided.'});
//    }
//    jwt.verify(token, CLIENT_SECRET, (err : any, decoded : any) => {
//      if (err) {
//        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
//      }
//
//      // if everything good, save to request for use in other routes
//      next();
//    });
//  }
