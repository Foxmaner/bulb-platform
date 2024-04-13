import { Request, Response } from 'express';
import { UserModel } from '../models';

export class MeetingController {

    static async load(req: any, res: Response) {
        const userID = req.session.passport.user

        const user = await UserModel.findById(userID);

        const resp = await user.getMeetings();

        console.log(resp.body);

        return res.status(200).json(resp.body);
    }
    
    static id(req: Request, res: Response) {
        
    }
    
    static delete(req: Request, res: Response) {
        
    }

    static async create(req: any, res: Response) {
        const userID = req.session.passport.user

        const user = await UserModel.findById(userID);

        const resp = await user.createMeeting(req.body);

        res.status(200).json({ message: "Success!" });
    }

    static edit(req: Request, res: Response){

    }

    static editPost(req: Request, res: Response) {
        
    }

}