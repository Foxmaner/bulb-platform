import { response } from 'express';
import jwt, {Secret} from 'jsonwebtoken';

const secretKey : Secret = 'A_SECRET_KEY'

function verifyToken (token : any) {
    if (!token){
        return false;
    }
    
}