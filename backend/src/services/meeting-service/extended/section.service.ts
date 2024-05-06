
import mongoose from "mongoose";


import { MeetingModel, UserModel } from "../../../models";
import { Meeting } from "index";

import { Response as res } from "../../utils.service";


/**
 * MethodMeetingService class
 * This class contains all the methods that can be used by the MeetingService class
 */
export class MethodSectionService extends mongoose.Model<Meeting> {
    async getSection(sectionID) {

        const section = await MeetingModel.aggregate([
            { $match: { _id: this._id } },
            { $unwind: '$sections' },
            { $match: { 'sections._id': sectionID } },
            { $project: { 'sections': sectionID } }
        ])

        if (!section) {
            return res.status(404).json({ message: "No meeting" });
        }

        return res.status(200).json(section[0].sections);
    }

    async addSection (name: string = "Untitled Section") {
        var _id = Math.max(...this.sections.map((section: any) => section._id),
            ...this.history.map((p: any) => p._id)
        ) + 1;
        if (_id < 0) {
            _id = 1;
        }

        const section = {
            "_id": _id,
            "title": name,
            "dateCreated": Date()
        }

        await this.updateOne({ $push: { sections: section } });

        return res.status(200).json(section);
    }

    async removeSection (sectionID: number) {
        await this.updateOne(
            { 
                $push: { history: { sections: { _id: sectionID } } },
                $pull: { sections: { _id: sectionID } } 
            }
        );

        return res.status(200).json({ message: "Section removed" });
    }
}