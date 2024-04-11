import { Request, Response } from 'express';
import { CLIENT_RENEG_LIMIT } from 'tls';

export default class MeetingController {

    static load(req: Request, res: Response) {
        const user = req.body.user;
        if (!user){
            res.send("No user").status(400);
        }
        
        res.send("Hello World!").status(200);
    }
    static id(req: Request, res: Response) {
        
    }
    
    static delete(req: Request, res: Response) {
        
    }

    static create(req: Request, res: Response) {
        
    }

    static edit(req: Request, res: Response){

    }

    static editPost(req: Request, res: Response) {
        
    }

}