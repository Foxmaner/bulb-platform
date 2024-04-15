import mongoose, { ObjectId } from "mongoose";


import { User } from "index";

import { MeetingModel } from "../../models";

import { Response as res } from "../utils.service";


export class MethodUserService extends mongoose.Model<User> {

    async addMeeting (meetingID: ObjectId) {
        await this.updateOne({ $push: { accessibleMeetings: meetingID } });

        return res.status(200).json({ message: "Meeting added" });
    }

    async removeMeeting (meetingID: ObjectId) {
        await this.updateOne({ $pull: { accessibleMeetings: meetingID }});

        return res.status(200).json({ message: "Meeting removed" });
    }

    changeCompany (companyID: ObjectId) {
        // Needs to add if last user of current company otherwise delete company...

        this.companyID = companyID;

        return res.status(200).json({ message: "Company changed" });
    }

    changeAccessLevel (newLevel: string) {
        this.accesLevel = newLevel;

        return res.status(200).json({ message: "Access level changed" });
    }

    async createMeeting(props: { name: string }) {
        try {

            const Meeting = new MeetingModel({
                name: props.name,
                date: new Date(),
                members: [
                    { userID: this._id, role: "owner" }
                ]
            });
            await Meeting.save();
            
            await this.addMeeting(Meeting._id);

            return res.status(201).json(Meeting);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getMeetings () {
        const pipelineResult = await MeetingModel.aggregate([
            { $addFields: { "members.userID": this._id } }
        ]);
        return res.status(200).json(pipelineResult);
    }

    getMeeting(meetingID) {
        const meeting = new MeetingModel.findById(meetingID);

        return res.status(200).json(meeting);
    }

    /*async addUserToMeeting (user: Member, meetingID: Schema.Types.ObjectId, res: Response) {
        const meeting = await MeetingModel.get(meetingID)

        meeting        
    }*/
}
