import mongoose from "mongoose";

import { MeetingModel } from "../../../models";
import { Meeting } from "index";

import { Response as res } from "../../utils.service";

/**
 * MethodMeetingService class
 * This class contains all the methods that can be used by the MeetingService class
 */
export class MethodParagraphService extends mongoose.Model<Meeting> {
    async getParagraph(sectionID, paragraphID) {
        const paragraph = await MeetingModel.aggregate([
            { $match: { "sections._id": sectionID, "meeting._id": this._id } },
            { $project: { _id: paragraphID } },
        ]);

        if (!paragraph) {
            return res.status(404).json({ message: "No meeting" });
        }
        return res.status(200).json(paragraph);
    }

    async editPargraphText(text, sectionID, paragraphID) {
        this.updateOne({
            $match: {
                "sections._id": sectionID,
                "sections.contains._id": paragraphID,
            },
            $set: { text: text },
        });

        return res.status(200).json({ message: "Paragraph edited" });
    }

    async pushParagraphHistory(history, sectionID, paragraphID) {
        this.updateOne({
            $match: {
                "mainDocumentSections._id": sectionID,
                "mainDocumentSections.contains._id": paragraphID,
            },
            $push: { paragraphHistory: history },
        });

        return res.status(200).json({ message: "History added" });
    }

    async addParagraph(sectionID: number) {
        const section = this.mainDocumentSections.find(
            (section) => section._id == sectionID
        );

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        let _id =
            Math.max(...section.contains.map((section: any) => section._id)) +
            1;

        if (_id < 0) {
            _id = 1;
        }

        const newParagraph = {
            _id,
            dateCreated: new Date(),
        };

        await this.updateOne(
            {
                $push: {
                    "mainDocumentSections.$[element].contains": newParagraph,
                },
            },
            { arrayFilters: [{ "element._id": sectionID }] }
        );

        return res.status(200).json(newParagraph._id);
    }

    async removeParagraph(sectionID: number, paragraphID: number) {
        await this.updateOne(
            {
                $push: {
                    'mainDocumentSections.$[s].sectionHistory':  {
                        'contains': { _id: paragraphID }
                    }
                },
                $pull: {
                    "mainDocumentSections.$[s].contains": { 
                        _id: paragraphID 
                    }
                }
            },
            {
                arrayFilters: [
                    { 's._id': sectionID }
                ]
            }
        );

        return res.status(200).json({ message: "Paragraph removed" });
    }

    async addComment(sectionID: number, paragraphID: number, comment: any) {
        this.sections[sectionID].contains[paragraphID].comments.push(comment);

        return res.status(200).json({ message: "Comment added" });
    }

    async removeComment(
        sectionID: number,
        paragraphID: number,
        commentID: number
    ) {
        const newComments = this.sections[sectionID].contains[
            paragraphID
        ].comments.filter((comment: any) => comment.id !== commentID);
        this.sections[sectionID].contains[paragraphID].comments = newComments;

        return res.status(200).json({ message: "Comment removed" });
    }
}
