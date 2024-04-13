import { Request, Response } from 'express';

export default class MeetingController {

    static load(req: Request, res: Response) {
        // @ts-ignore
        console.log(req.user);
        res.status(200).json({ meetings: ["Success!", "Hello World"] });
    }
    static id(req: Request, res: Response) {
        
    }
    
    static delete(req: Request, res: Response) {
        
    }

    static create(req: Request, res: Response) {
        console.log(req.body)
        res.status(200).json({message : "Success"})
    }

    static edit(req: Request, res: Response){

    }

    static editPost(req: Request, res: Response) {
        
    }

}