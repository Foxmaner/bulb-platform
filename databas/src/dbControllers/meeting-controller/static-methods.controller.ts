import { MeetingModel, UserModel }  from '../../models';
import { Request, Response } from 'express';

import mongoose, { ObjectId } from 'mongoose';

import { Meeting } from "index";
import BaseController from '../base.controller';


export class StaticMeetingController<T> extends BaseController<T> {

    static async delete(id: ObjectId, res: Response) {
        try {
            const result = await MeetingModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Object not found." });
            }
            const result2 = await UserModel.updateMany(
                { accessibleMeetings: { id } },
                { $unset: { "accessibleMeetings$[element]": "" } }
            )
            // TODO CONRAD!!!!
            return res.status(200).json({ message: "Object removed." });
        } catch (err) {
            return res.status(500).json({ message: "An error occurred." });
        }
    }

    static async list(req: Request, res: Response) {
        const meetings = await MeetingModel.find({});
        return res.json(meetings);
    }

    static async get(id: string, res: Response) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        }

        const meeting = await MeetingModel.findById(id);
        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        return res.status(200).json(meeting);
    }
}
