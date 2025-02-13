import mongoose, { ObjectId } from "mongoose";


import { User } from "index";

import { MeetingModel } from "../../models";

import { Response as res } from "../utils.service";


/**
 * MethodUserService class
 * This class contains all the methods that can be used by the UserService class
 */
export class MethodUserService extends mongoose.Model<User> {

    async getSharedMeeting() {
        const pipelineResult = await MeetingModel.find({
            "members": { $elemMatch: { "userID": this._id, "role": { $ne: "owner" } } }
        });
        
        console.log(pipelineResult);

        return res.status(200).json(pipelineResult);
    }

    async getPublishedMeetings() {
        const meetings = await MeetingModel.aggregate([
            {
                $match: {
                    "published": true
                }
            }
        ]);

        return res.status(200).json(meetings);
    }

    async publishMeeting(meetingID: ObjectId) {
        await MeetingModel.findByIdAndUpdate(meetingID, { published: true });

        return res.status(200).json({ message: "Meeting published" });
    }

    async changeNameOfMeeting (meetingID: ObjectId, newName: string) {
        const meeting = await MeetingModel.findById(meetingID);

        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        meeting.members.forEach((member: any) => {
            if (member.role == "owner" && member.userID != this._id) {
                return res.status(403).json({ message: "User is not the owner of this meeting" });
            }
        })

        meeting.updateOne({ name: newName });

        return res.status(200).json({ meeting: "Meeting Name Successfully Changed!" });
    }

    async addWordCloudWord (meetingID: ObjectId, word: string, weight: number) {
        const meeting = await MeetingModel.updateOne([
            { 
                $match: { "_id": meetingID as ObjectId },
                $set: { "wordCloud": { word, weight } }
            }
        ]);

        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        return res.status(200).json({ message: "Word added to word cloud" });
    }

    async addMeeting (meetingID: ObjectId) {
        await this.updateOne({ $push: { accessibleMeetings: meetingID } });

        return res.status(200).json({ message: "Meeting added" });
    }

    async removeAllMeetings () {
        await MeetingModel.findMany({ 
            accessibleMeetings: this._id 
        });
        return res.status(200).json({ message: "All meetings removed" });
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

    async createMeeting(props: any) {
        try {
            console.log(props);

            let meeting;
            if (props.scheduledStart && props.scheduledEnd) {
                meeting = new MeetingModel({
                    name: props.name,
                    scheduledStart: new Date(props.scheduledStart),
                    scheduledEnd: new Date(props.scheduledEnd),
                    date: new Date(),
                    members: [
                        { userID: this._id, role: "owner" }
                    ]
                });
            } else {
                meeting = new MeetingModel({
                    name: props.name,
                    date: new Date(),
                    members: [
                        { userID: this._id, role: "owner" }
                    ]
                });
            }

            await meeting.save();
            await this.addMeeting(meeting._id);

            return res.status(201).json(meeting);
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ error: error.message });
        }
    }

    async getMeetings () {
        const pipelineResult = await MeetingModel.find({
            "members.userID": this._id,
            "members.role": "owner"
        });

        return res.status(200).json(pipelineResult);
    }

    async getMeeting(meetingID) {
        if (!mongoose.Types.ObjectId.isValid(meetingID)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        } 

        const meeting = await MeetingModel.get(meetingID as ObjectId)

        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        return res.status(200).json({ meeting: meeting.body.meeting });
    }

    /*async addUserToMeeting (user: Member, meetingID: Schema.Types.ObjectId, res: Response) {
        const meeting = await MeetingModel.get(meetingID)

        meeting        
    }*/
}
