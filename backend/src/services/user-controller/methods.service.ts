import { ObjectId, Schema } from "mongoose";

import { Response } from "express";
import BaseService from "../base.service";
import { Member, Meeting } from "index";

import { MeetingModel } from "../../models";

import { Response as res } from "../utils.service";

export class MethodUserService<T> extends BaseService<T> {

    signIn (token: string) {
        this.model.token = token;

        return res.status(200).json({ token, message: "User signed in" });
    }

    signOut () {
        this.model.token = null;

        return res.status(200).json({ message: "User signed out" });
    }

    getToken () {
        if (!this.model.token) {
            return res.status(404).json({ message: "User is not signed in" });
        }

        res.status(200).json({ token: this.model.token });
    }

    addMeeting (meetingID: ObjectId) {
        this.model.accessibleMeetings.push(meetingID);

        return res.status(200).json({ message: "Meeting added" });
    }

    removeMeeting (meetingID: ObjectId) {
        const newMeetings =  this.model.accessibleMeetings.filter((id: ObjectId) => id !== meetingID);
        this.model.accessibleMeetings = newMeetings;

        return res.status(200).json({ message: "Meeting removed" });
    }

    changeCompany (companyID: ObjectId) {
        // Needs to add if last user of current company otherwise delete company...

        this.model.companyID = companyID;

        return res.status(200).json({ message: "Company changed" });
    }

    changeAccessLevel (newLevel: number) {
        this.model.accesLevel = newLevel;

        return res.status(200).json({ message: "Access level changed" });
    }

    async createMeeting(props: Meeting) {
        try {
            const Meeting = new MeetingModel(props);
            await Meeting.save();

            return res.status(201).json(Meeting);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    getMeetings () {
        const pipelineResult = this.model.aggregate([{
            $match:{_id:this.model._id},
            $lookup:{from:"Meetings",localField:"accessibleMeetings",foreignField:"_id",as:"Joined meetings"},
            $replaceRoot:{newRoot:"Joined meetings"},
            $unset:["meetingHistory","mainDocumentSections","summaryDocumentSections"],
        }]);
        return res.status(200).json(pipelineResult);
    }

    /*async addUserToMeeting (user: Member, meetingID: Schema.Types.ObjectId, res: Response) {
        const meeting = await MeetingModel.get(meetingID)

        meeting        
    }*/
}
