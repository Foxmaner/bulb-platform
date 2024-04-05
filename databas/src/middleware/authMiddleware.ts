import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'wrong';
console.log(CLIENT_SECRET);

export default function verifyToken (token : string) {
  console.log(token)
  if (!token) {
    return false;
  }
  const decoded = jwt.verify(token, CLIENT_SECRET, {algorithms:['RS256']});
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
