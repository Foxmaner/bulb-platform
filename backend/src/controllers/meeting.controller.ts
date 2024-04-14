import { Request, Response } from 'express';
import { MeetingModel, UserModel } from '../models';

export class MeetingController {

    static async load(req: any, res: Response) {
        const userID = req.session.passport.user

        const user = await UserModel.findById(userID);

        const resp = await user.getMeetings();

        console.log(resp.body);

        return res.status(resp.statusCode).json({meetings : resp.body});
    }
    
    static async id(req: any, res: Response) {
        const id = req.params.id;

        const resp = await MeetingModel.get(id);

        console.log(resp.body);

        return res.status(resp.statusCode).json(resp.body);
    }
    
    //Not working
    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        //somethign not correct
        const resp = await MeetingModel.delete(id);

        console.log(resp.body);

        if(resp.statusCode == 200){
            return res.status(200).json({ message: "Deleted" });
        }
        return res.status(resp.statusCode).json({ message: "Failed to delete" });
    }

    //Sometimes doesn't work. dont know cause
    static async create(req: any, res: Response) {
        const userID = req.session.passport.user

        const user = await UserModel.findById(userID);

        const resp = await user.createMeeting(req.body);

        console.log(resp.body);
    
        res.status(resp.statusCode).json(resp.body);
    }

    static edit(req: Request, res: Response){

    }

    static editPost(req: Request, res: Response) {
        
    }

}