import { ObjectId, Schema} from "mongoose";

import { getModelForClass } from '@typegoose/typegoose';

import { Response } from "express";
import { CompanyModel } from "../../models";


export class MethodUserController<T> {
    private userModel: any;

    constructor(model: new <T>(model: new () => T) => MethodUserController<T>) {
        this.userModel = getModelForClass(model);
    }

    async signIn (token: any, res: Response) {
        this.userModel.token = token;

        res.status(200).json({ token, message: "User signed in" });
    }

    async signOut (res: Response) {
        this.userModel.token = null;

        res.status(200).json({ message: "User signed out" });
    }

    async addMeeting (meetingID: ObjectId, res: Response) {
        this.userModel.accessibleMeetings.push(meetingID);

        res.status(200).json({ message: "Meeting added" });
    }

    async removeMeeting (meetingID: ObjectId, res: Response) {
        const newMeetings =  this.userModel.accessibleMeetings.filter((id: ObjectId) => id !== meetingID);
        this.userModel.accessibleMeetings = newMeetings;

        res.status(200).json({ message: "Meeting removed" });
    }

    async changeCompany (companyID: ObjectId, res: Response) {
        // Needs to add if last user of current company otherwise delete company...

        this.userModel.companyID = companyID;

        res.status(200).json({ message: "Company changed" });
    }

    // This should probably be overlooked :)
    async changeAccessLevel (newLevel: Number, res: Response) {
        this.userModel.accesLevel = newLevel;

        res.status(200).json({ message: "Access level changed" });
    }
}