import { Request, Response } from 'express';
import { MeetingModel, UserModel } from '../../models';


export class MeetingController {

    static async load(req: any, res: Response) {

        const userID = req.session.passport.user
        const respUser = await UserModel.get(userID);
        const user = respUser.body.user;

        if(respUser.statusCode != 200){
            return res.status(401).json(respUser.body)
        }

        const resp = await user.getMeetings();

        if(process.env.DEBUG == "true"){
            console.log(resp.body)
        }

        if(resp.statusCode != 200){
            return res.status(resp.statusCode).json(resp.body)
        }

        res.status(200).json({meetings: resp.body});
    }
    
    static async id(req: any, res: Response) {
        const userID = req.session.passport.user;
        const respUser = await UserModel.get(userID);
        const user = respUser.body.user;
        const meetingId = req.params.id

        if(respUser.statusCode != 200){
            return res.status(401).json(respUser.body)
        }

        const resp = await user.getMeeting(meetingId);
        const userMeeting = resp.body.meeting;

        if(process.env.DEBUG == "true"){
            console.log(resp.body)
        }

        if(!userMeeting){
            return res.status(404).json({message : "meeting not found"})
        }
        res.status(200).json({meeting: userMeeting});
    }
    
    static async delete(req: any, res: Response) {
        const userID = req.session.passport.user;
        const respUser = await UserModel.get(userID);

        const user = respUser.body.user;
        const meetingId = req.params.id

        if(respUser.statusCode != 200){
            return res.status(401).json(respUser.body)
        }

        const respMeeting = await MeetingModel.get(meetingId);
        const meeting = respMeeting.body.meeting;

        if (!meeting) {
            return res.status(404).json({ message : "meeting not found" });
        }

        const respUserRemoveMeeting = await user.removeMeeting(meetingId);

        if(respUserRemoveMeeting.statusCode != 200){
            return res.status(respUserRemoveMeeting.statusCode).json(respUserRemoveMeeting.body)
        }

        const ownerResp = await meeting.getOwner();

        if (!ownerResp) {
            return res.status(500).json({ message: "Internal Error" });
        }

        let respMeetingRemove;

        if (ownerResp.body.owner._id.equals(user._id)){
            respMeetingRemove =  await meeting.removeAllUsers();
            await MeetingModel.findByIdAndDelete(meetingId);
        } else {
            respMeetingRemove = await meeting.removeMember(userID);
        }

        if(process.env.DEBUG == "true"){
            console.log(respMeetingRemove.body)
        }

        if(respMeetingRemove.statusCode != 200){
            return res.status(respMeetingRemove.statusCode).json(respMeetingRemove.body)
        }
        res.status(200).json({ message: "Success!" });
    }

    static async create(req: any, res: Response) {
        const userID = req.session.passport.user
        const respUser = await UserModel.get(userID);
        const user = respUser.body.user;

        if(respUser.statusCode != 200){
            return res.status(401).json( respUser.body)
        }

        const resp = await user.createMeeting(req.body);        
        

        if(process.env.DEBUG == "true"){
            console.log(resp.body)
        }

        if(resp.statusCode != 201){
            return res.status(400).json(resp.body)
        }

        res.status(201).json({ message: "meeting created", meeting: resp.body });
    }

    static async renameMeeting(req: any, res: Response){
        const userID = req.session.passport.user;
        const respUser = await UserModel.get(userID);
        const user = respUser.body.user;
        const meetingId = req.params.id
        const newName = req.params.name

        if(respUser.statusCode != 200){
            return res.status(401).json(respUser.body)
        }

        const respMeetings = await user.getMeetings();
        const userMeetings = respMeetings.body;

        if(process.env.DEBUG == "true"){
            console.log(respMeetings.body)
        }

        const meeting = userMeetings.find(meeting => meeting._id == meetingId);

        if(!meeting){
            return res.status(404).json({message : "meeting not found"})
        }

        //function deosnt exist
        const resp = await user.renameMeeting(req.body)

        if(resp.statusCode != 200){
            return res.status(401).json(respUser.body)
        }

        res.status(200).json({message : "meeting renamed " + newName});
    }


    static async publish(req: any, res: Response){
        const userID = req.session.passport.user
        const respUser = await UserModel.get(userID);
        const user = respUser.body;
        const meetingId = req.params.id

        if(respUser.statusCode != 200){
            return res.status(401).json( respUser.body)
        }        

        const resp = await user.getMeetings();
        const userMeetings = resp.body;

        const meeting = userMeetings.find(meeting => meeting._id == meetingId);

        if(!meeting){
            return res.status(404).json({message : "meeting not found"})
        }

        //function doesn't exist yet
        const respPublish = await meeting.publish()

        if(process.env.DEBUG == "true"){
            console.log(respPublish.body)
        }

        if(resp.statusCode != 200){
            return res.status(respPublish.statusCode).json(respPublish.body)
        }
        
        res.status(200).json({message : "meeting posted"});
    }

    static async changeAcessLevel(req: any, res: Response){
        const userID = req.session.passport.user
        const respUser = await UserModel.get(userID);
        const user = respUser.body.user;
        const meetingId = req.params.id

        if(respUser.statusCode != 200){
            return res.status(401).json(respUser.body)
        }
        
        const respMeetings = await user.getMeetings();
        const userMeetings = respMeetings.body;

        if(process.env.DEBUG == "true"){
            console.log(respMeetings.body)
        }

        const meeting = userMeetings.find(meeting => meeting._id == meetingId);
        
        const resp = await meeting.changeAcessLevel(meetingId, req.body)

        if(process.env.DEBUG == "true"){
            console.log(resp.body)
        }

        if(resp.statusCode != 200){
            return res.status(resp.statusCode).json(resp.body)
        }
        
        res.status(200).json({message : "meeting posted"});
    }

    static async advancedLoad(req: any, rep: Response){
        //dependant on ho backend implements this we either have to do almost nothing or alot
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
