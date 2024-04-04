import { ObjectId } from "mongoose";

import { Response } from "express";
import BaseController from "../base.controller";


export class MethodUserController<T> extends BaseController<T> {

    signIn (token: any, res: Response) {
        this.model.token = token;

        res.status(200).json({ token, message: "User signed in" });
    }

    signOut (res: Response) {
        this.model.token = null;

        res.status(200).json({ message: "User signed out" });
    }

    getToken (res: Response) {
        if (!this.model.token) {
            return res.status(404).json({ message: "User is not signed in" });
        }

        res.status(200).json({ token: this.model.token });
    }

    addMeeting (meetingID: ObjectId, res: Response) {
        this.model.accessibleMeetings.push(meetingID);

        res.status(200).json({ message: "Meeting added" });
    }

    removeMeeting (meetingID: ObjectId, res: Response) {
        const newMeetings =  this.model.accessibleMeetings.filter((id: ObjectId) => id !== meetingID);
        this.model.accessibleMeetings = newMeetings;

        res.status(200).json({ message: "Meeting removed" });
    }

    changeCompany (companyID: ObjectId, res: Response) {
        // Needs to add if last user of current company otherwise delete company...

        this.model.companyID = companyID;

        res.status(200).json({ message: "Company changed" });
    }

    // This should probably be overlooked :)
    changeAccessLevel (newLevel: number, res: Response) {
        this.model.accesLevel = newLevel;

        res.status(200).json({ message: "Access level changed" });
    }
}