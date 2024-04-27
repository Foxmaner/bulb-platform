
import mongoose, { ObjectId } from "mongoose";


import { MeetingModel, UserModel } from "../../../models";
import { Meeting } from "index";

import { Response as res } from "../../utils.service";


/**
 * MethodMeetingService class
 * This class contains all the methods that can be used by the MeetingService class
 */
export class MethodSectionService extends mongoose.Model<Meeting> {

    async addSection (name: string = "Untitled Section") {
        var _id = Math.max(...this.mainDocumentSections.map((section: any) => section._id)) + 1;
        if (_id < 0) {
            _id = 1;
        }

        const section = {
            "_id": _id,
            "title": name,
            "dateCreated": Date()
        }

        await this.updateOne({ $push: { mainDocumentSections: section } });

        return res.status(200).json(section);
    }

    async removeSection (sectionID: number) {
        await this.updateOne(
            { 
                $push: { meetingHistory: { mainDocumentSections: { _id: sectionID } } },
                $pull: { mainDocumentSections: { _id: sectionID } } 
            }
        );

        return res.status(200).json({ message: "Section removed" });
    }
}