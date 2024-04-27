import mongoose, { ObjectId } from "mongoose";


import { MeetingModel, UserModel } from "../../models";
import { Meeting, Section } from "index";

import { Response as res } from "../utils.service";


/**
 * MethodMeetingService class
 * This class contains all the methods that can be used by the MeetingService class
 */
export class MethodMeetingService extends mongoose.Model<Meeting> {

    async changeAccessLevel (userID: ObjectId, accessLevel: string) {
        await this.updateOne({ 
            $set: { "members.$[element].role": accessLevel } }, 
            { arrayFilters: [ { "element.userID": userID } ] 
        });
    }

    isMember (userID: ObjectId) {
        if (!this.members.includes(userID)) {
            return res.status(403).json({ message: "User is not a member of this meeting" });
        }

        return res.status(200);
    }

    async removeAllUsers () {
        for (const member of this.members) {
            const resp = await UserModel.get(member.userID);

            if (resp.statusCode !== 200) {
                return res.status(404).json({ message: "User not found" });
            }

            resp.body.user.removeMeeting(this._id);

            if (resp.statusCode !== 200) {
                return res.status(500).json({ message: "Error removing meeting from user" });
            }
        }

        return res.status(200).json({ message: "Meeting removed" });
    }

    async getOwner () {
        const owner = await this.members.find((member: any) => {
            return member.role == 2;
        });

        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const resp = await UserModel.get(owner.userID);

        if (resp.statusCode !== 200) {
            return res.status(404).json({ message: "Owner not found" });
        }

        return res.status(200).json({ owner: resp.body.user });
    }

    async removeMember (userID: ObjectId) {
        this.updateOne({ $pull: { members: userID } });
    }

    async addMember (userID: ObjectId) {
        this.members.push(userID);

        const resp = await UserModel.get(userID);

        if (resp.statusCode !== 200) {
            return res.status(404).json({ message: "User not found" });
        }

        resp.user.addMeeting(this._id, res);

        if (resp.statusCode !== 200) {
            return res.status(500).json({ message: "Error adding meeting to user" });
        }

        return res.status(200).json({ message: "User added" });
    }

    /**
     * Section
    */
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

    /**
     * Paragraph
     */
    async getParagraph(sectionID, paragraphID) {
        const paragraph =  await MeetingModel.aggregate([
            { $match: { "sections._id": sectionID, "meeting._id": this._id } },
            { $project: { _id: paragraphID } }
        ]);

        if (!paragraph) {
            return res.status(404).json({ message: "No meeting" })
        }
        return res.status(200).json(paragraph)
    }

    async editPargraphText(text, sectionID, paragraphID) {
        this.updateOne({
            $match: { "sections_id": sectionID, "sections.contains._id": paragraphID },
            $set: { text: text } 
        });

        return res.status(200).json({ message: "Paragraph edited" });
    }

    async pushParagraphHistory(history, sectionID, paragraphID) {
        this.updateOne({
            $match: { "mainDocumentSections._id": sectionID, "mainDocumentSections.contains._id": paragraphID },
            $push: { paragraphHistory: history } 
        });

        return res.status(200).json({ message: "History added" });
    }

    async addParagraph (sectionID: number) {
        const section = this.mainDocumentSections.find((section) => section._id == sectionID);
        
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }
        var _id = Math.max(...section.contains.map((section: any) => section._id)) + 1;

        if (_id < 0) {
            _id = 1;
        }

        const newParagraph = {
            "id": _id as Number,
            "text": "",
            "paragraphHistory": [],
            "comments": [],
            "dateCreated": Date()
        };

        /* console.log(newParagraph);
        await this.updateOne(
            { $push: { "mainDocumentSections.$[element].contains": newParagraph } },
            { arrayFilters: [ { "element._id": section._id } ] }
        );*/

        section.contains.push(newParagraph);
        await this.save();

        console.log(this.mainDocumentSections[0].contains[0]);

        console.log("Paragraph added");
    
        return res.status(200).json(newParagraph.id);
    }

    async removeParagraph (sectionID: number, paragraphID: number) {
        await this.updateOne({ 
            $match: { "mainDocumentSections._id": sectionID },
            $push: { "mainDocumentSections.$.sectionHistory": { "mainDocumentSections.$.contains._id": paragraphID } },
            $pull: { "mainDocumentSections.$.contains._id": paragraphID } 
        });

        return res.status(200).json({ message: "Paragraph removed" });
    }

    /**
     * Paragraph
    */
    addQuestion (sectionID: number) {
        const newQuestion = {
            id: this.sections[sectionID].contains.length,
            questionHistory: [],
            comments: []
        }

        this.sections[sectionID].contains.push(newQuestion);

        return res.status(200).json(newQuestion);
    }

    removeQuestion (sectionID: number, questionID: number) {
        const newQuestions = this.sections[sectionID].contains.filter((question: any) => question.id !== questionID);
        this.sections[sectionID].contains = newQuestions;

        return res.status(200).json({ message: "Question removed" });
    }

    addAnswer (sectionID: number, questionID: number, answer: any) {
        this.sections[sectionID].contains[questionID].responses.push(answer);

        return res.status(200).json({ message: "Answer added" });
    }

    removeAnswer (sectionID: number, questionID: number, answerID: number) {
        const newAnswers = this.sections[sectionID].contains[questionID].responses.filter((answer: any) => answer.id !== answerID);
        this.sections[sectionID].contains[questionID].responses = newAnswers;

        return res.status(200).json({ message: "Answer removed" });
    }

    async addComment (sectionID: number, paragraphID: number, comment: any) {
        this.sections[sectionID].contains[paragraphID].comments.push(comment);

        return res.status(200).json({ message: "Comment added" });
    }

    async removeComment (sectionID: number, paragraphID: number, commentID: number) {
        const newComments = this.sections[sectionID].contains[paragraphID].comments.filter((comment: any) => comment.id !== commentID);
        this.sections[sectionID].contains[paragraphID].comments = newComments;

        return res.status(200).json({ message: "Comment removed" });
    }

    async addImage (sectionID: number) {
        // Add image
    }

    async removeImage (sectionID: number, imageID: number) {
        // Remove image
    }
}
