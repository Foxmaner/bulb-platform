import mongoose, { ObjectId } from "mongoose";


import { User } from "index";

import { MeetingModel } from "../../models";

import { Response as res } from "../utils.service";


export class MethodUserService extends mongoose.Model<User> {

    async addMeeting (meetingID: ObjectId) {
        await this.updateOne({ $push: { accessibleMeetings: meetingID } });

        console.log("adding meeting", this.accessibleMeetings);

        return res.status(200).json({ message: "Meeting added" });
    }

    removeMeeting (meetingID: ObjectId) {
        const newMeetings =  this.accessibleMeetings.filter((id: ObjectId) => id !== meetingID);
        this.accessibleMeetings = newMeetings;

        return res.status(200).json({ message: "Meeting removed" });
    }

    changeCompany (companyID: ObjectId) {
        // Needs to add if last user of current company otherwise delete company...

        this.companyID = companyID;

        return res.status(200).json({ message: "Company changed" });
    }

    changeAccessLevel (newLevel: number) {
        this.accesLevel = newLevel;

        return res.status(200).json({ message: "Access level changed" });
    }

    async createMeeting(props: { name: string }) {
        try {

            const Meeting = new MeetingModel({
                name: props.name,
                date: new Date(),
                accessibleMembers: []
            });
            await Meeting.save();
            
            await this.addMeeting(Meeting._id);

            return res.status(201).json(Meeting);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    getMeetings () {
        /*const pipelineResult = this.aggregate([{
            $match:{_id:this.model._id},
            $lookup:{from:"Meetings",localField:"accessibleMeetings",foreignField:"_id",as:"Joined meetings"},
            $replaceRoot:{newRoot:"Joined meetings"},
            $unset:["meetingHistory","mainDocumentSections","summaryDocumentSections"],
        }]);

        //this.accessibleMeetings;*/

        return res.status(200).json(this.accessibleMeetings.map((meeting => meeting.toString())));
    }

    /*async addUserToMeeting (user: Member, meetingID: Schema.Types.ObjectId, res: Response) {
        const meeting = await MeetingModel.get(meetingID)

        meeting        
    }*/
}
