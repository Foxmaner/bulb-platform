import { ObjectId } from "mongoose";

import { Response } from "express";

import BaseController from "../base.controller";


export class MethodMeetingController<T> extends BaseController {

    async isMember (userID: ObjectId, res: Response) {
        if (!this.model.members.includes(userID)) {
            return res.status(403).json({ message: "User is not a member of this meeting" });
        }

        return res.status(200);
    }
}