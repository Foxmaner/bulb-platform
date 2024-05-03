import mongoose from "mongoose";

import { MeetingModel } from "../../../models";
import { Answer, Meeting } from "index";

import { Response as res } from "../../utils.service";

/**
 * MethodMeetingService class
 * This class contains all the methods that can be used by the MeetingService class
 */
export class MethodParagraphService extends mongoose.Model<Meeting> {
    async getParagraph(sectionID, paragraphID) {
        console.log(sectionID, paragraphID)

        const paragraph = await MeetingModel.aggregate([
            { $match: { _id: this._id } },
            { $unwind: '$sections' },
            { $unwind: '$sections.contains' },
            { $match: { 'sections.contains._id': paragraphID } },
            { $project: { 'sections.contains': sectionID } }
        ])

        if (!paragraph) {
            return res.status(404).json({ message: "No meeting" });
        }

        return res.status(200).json(paragraph[0].sections.contains);
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
                "sections._id": sectionID,
                "sections.contains._id": paragraphID,
            },
            $push: { history: history },
        });

        return res.status(200).json({ message: "History added" });
    }

    async addParagraph(sectionID: number) {
        const section = this.sections.find(
            (section) => section._id == sectionID
        );

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        let _id =
            Math.max(...section.contains.map((p: any) => p._id), ...section.history.map((p: any) => p._id)) +
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
                    "sections.$[element].contains": newParagraph,
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
                    'sections.$[s].history':  {
                        'contains': { _id: paragraphID }
                    }
                },
                $pull: {
                    "sections.$[s].contains": { 
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


    async addAnswer(sectionID: number, paragraphID: number, answer: Answer) {
        const section = this.sections.find(
            (section) => section._id == sectionID
        );

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        const paragraph = section.contains.find((p) => p._id == paragraphID);

        if (!paragraph) {
            return res.status(404).json({ message: "Paragraph not found" });
        }

        let _id =
            Math.max(...paragraph.responses.map((response: any) => response._id),
            ...paragraph.history.map((response: any) => response._id)
        ) + 1;

        if (_id < 0) {
            _id = 1;
        }
        
        answer._id = _id;
        answer.dateCreated = new Date();

        await this.updateOne(
            {
                $push: {
                    "sections.$[s].contains.$[p].responses": answer,
                },
            },
            { 
                arrayFilters: [
                    { 
                        "s._id": sectionID 
                    },
                    { 
                        "p._id": paragraphID 
                    }
                ] 
            }
        );

        return res.status(200).json({ message: "Answer added" });
    }

    async removeAnswer(sectionID: number, paragraphID: number, answerID: number) {
        await this.updateOne(
            {
                $push: {
                    'sections.$[s].contains.$[p].history':  {
                        'responses': { _id: answerID }
                    }
                },
                $pull: {
                    "sections.$[s].contains.$[p].responses": {
                        _id: answerID
                    },
                },
            },
            { 
                arrayFilters: [
                    { 
                        "s._id": sectionID 
                    },
                    { 
                        "p._id": paragraphID 
                    }
                ] 
            }
        );

        return res.status(200).json({ message: "Answer added" });
    }
}
