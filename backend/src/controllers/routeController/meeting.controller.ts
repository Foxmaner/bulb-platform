import { Request, Response } from 'express';
import { MeetingModel, UserModel } from '../../models';

export class MeetingController {
    static async load(req: any, res: Response) {
        const userID = req.session.passport.user
        const respUser = await UserModel.get(userID);
        const user = respUser.body;

        if(respUser.statusCode != 200){
            return res.status( respUser.statusCode).json( respUser.body)
        }

        const resp = await user.getMeetings();

        console.log("SEE WHAT THIS IS:")
        console.log(resp.body)

        if(process.env.DEBUG == "true"){
            console.log(resp.body)
        }

        if(resp.statusCode != 200){
            return res.status(resp.statusCode).json(resp.body)
        }

        res.status(200).json({documents: resp.body});
    }
    
    static async id(req: any, res: Response) {
        const userID = req.session.passport.user;
        const respUser = await UserModel.get(userID);
        const user = respUser.body;

        if(respUser.statusCode != 200){
            return res.status(respUser.statusCode).json(respUser.body)
        }

        const meetings = user.getMeetings();
        const meeting = meetings.body.find(meeting => meeting==req.params.id);
        
        if(!meeting){
            return res.status(404).json({message : "meeting not found"})
        }
        res.status(200).json({meeting : meeting});
    }
    
    static async delete(req: any, res: Response) {
        const userID = req.session.passport.user;
        const respUser = await UserModel.get(userID);
        const user = respUser.body;

        if(respUser.statusCode != 200){
            return res.status(respUser.statusCode).json(respUser.body)
        }

        //Make sure user is allowed to delete meeting, maybe with accessLevel=1?
        const resp = user.getMeetings();

        const meeting = resp.body.find(meeting => meeting==req.params.id);

        if(!meeting){
            return res.status(404).json({message : "meeting not found"})
        }

        const respDelete = await MeetingModel.delete(meeting);

        if(process.env.DEBUG == "true"){
            console.log(respDelete.body)
        }

        if(respDelete.statusCode != 200){
            return res.status(respDelete.statusCode).json(respDelete.body)
        }
        res.status(200).json({ message: "Success!" });
    }

    static async create(req: any, res: Response) {
        const userID = req.session.passport.user

        const respUser = await UserModel.get(userID);
        const user = respUser.body;

        if(respUser.statusCode != 200){
            return res.status(respUser.statusCode).json(respUser.body)
        }

        
        const resp = await user.createMeeting(req.body);        

        // if(process.env.DEBUG == "true"){
        //     console.log(resp.body)
        // }

        if(resp.statusCode != 201){
            return res.status(resp.statusCode).json(resp.body)
        }

        const id = resp.body._id.toString();

        res.status(201).json({ message: "meeting created", meeting: resp.body });
    }

    static edit(req: Request, res: Response){

    }

    static editPost(req: Request, res: Response) {
        
    }
    
    static async wordcloud(req: any, res: Response){
        
    }

    /*
    static async toDocument(req : any, res : Response){
        const userID = req.session.passport.user;
        const meetingId = req.params.id
        const meeting = MeetingModel.get(meetingId);
        if (meeting.isMember(userID).status!=403){
            meeting.setToDocument()
            res.status(200).json({message : "Success!"})
        }
        
        res.status(403).json({ message : "User not allowed to convert"})
    }
    */

}