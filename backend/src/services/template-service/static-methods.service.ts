import mongoose, { ObjectId } from 'mongoose';

import { TemplateModel } from '../../models';

import { Response as res } from '../utils.service';


export class StaticTemplateService {
    static async delete(id: ObjectId) {
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

    static async list() {
        const meetings = await TemplateModel.find({});
        
        return res.status(200).json(meetings);
    }

    static async get(id: string) {

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