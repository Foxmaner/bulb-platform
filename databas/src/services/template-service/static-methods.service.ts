import mongoose, { ObjectId } from 'mongoose';

import { Request, Response } from 'express';

import { TemplateModel } from '../../models';

import BaseService from '../base.service';


export class StaticTemplateService<T> extends BaseService<T> {
    static async delete(id: ObjectId, res: Response) {
        try {
            const result = await TemplateModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Object not found." });
            }
            
            return res.status(200).json({ message: "Object removed." });
        } catch (err) {
            return res.status(500).json({ message: "An error occurred." });
        }
    }

    static async list(req: Request, res: Response) {
        const meetings = await TemplateModel.find({});
        return res.json(meetings);
    }

    static async get(id: string, res: Response) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        }

        const meeting = await TemplateModel.findById(id);
        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        return res.status(200).json(meeting);
    }
}