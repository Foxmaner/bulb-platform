import { Request, Response } from 'express';
import { MeetingModel, UserModel } from '../models';

export class MeetingController {
    static async load(req: any, res: Response) {
        const userID = req.session.passport.user

        const user = await UserModel.findById(userID);

        const resp = await user.getMeetings();

        res.status(200).json(resp.body);
    }
    
    static async id(req: any, res: Response) {
        const userID = req.session.passport.user;
        const user = await UserModel.findById(userID);

        const meetings = user.getMeetings();
        const meeting = meetings.body.find(meeting => meeting==req.params.id);
        if(!meeting){
            res.status(404).json({meeting : []})
            return
        }

        res.status(200).json({meeting : [meeting]});
        
    }
    
    static async delete(req: any, res: Response) {
        const userID = req.session.passport.user;
        const user = await UserModel.findById(userID);

        //Make sure user is allowed to delete meeting, maybe with accessLevel=1?
        const resp = user.getMeetings();

        const meeting = resp.body.find(meeting => meeting==req.params.id);
        await MeetingModel.delete(meeting);
        res.status(200).json({ message: "Success!" });

    }

    static async create(req: any, res: Response) {
        const userID = req.session.passport.user

        const user = await UserModel.findById(userID);
        const resp = await user.createMeeting(req.body);
        const id = resp.body._id.toString();
        res.status(200).json({ message: "Success!", meeting: id });
    }

    static edit(req: Request, res: Response){

    }

    static editPost(req: Request, res: Response) {
        
    }

}