import { ObjectId } from "mongoose";

import { Response } from "express";

import BaseController from "../base.controller";
import { UserModel } from "../../models";
import { Section } from "index";


export class MethodMeetingController<T> extends BaseController<T> {

    isMember (userID: ObjectId, res: Response) {
        if (!this.model.members.includes(userID)) {
            return res.status(403).json({ message: "User is not a member of this meeting" });
        }

        return res.status(200);
    }

    async setToDocument (res: Response) {
        this.model.completed = true;

        res.status(200);
    }

    async setToMeeting (res: Response) {
        this.model.completed = false;

        res.status(200);
    }

    async addMember (userID: ObjectId, res: Response) {
        this.model.members.push(userID);

        const user = await UserModel.get(userID, res);

        if (res.statusCode !== 200) {
            return res.status(404).json({ message: "User not found" });
        }

        user.addMeeting(this.model._id, res);

        if (res.statusCode !== 200) {
            return res.status(500).json({ message: "Error adding meeting to user" });
        }

        return res.status(200).json({ message: "User added" });
    }

    /**
     * Section
     */
    addSection (res: Response) {
        const newSection: Section = {
            id: this.model.sections.length,
            title: "Untitled Section",
            contains: [],
            sectionHistory: []
        }

        this.model.sections.push(newSection);

        return res.status(200).json(newSection);
    }

    removeSection (sectionID: number, res: Response) {
        const newSections = this.model.sections.filter((section: Section) => section.id !== sectionID);
        this.model.sections = newSections;

        return res.status(200).json({ message: "Section removed" });
    }

    /**
     * Paragraph
     */
    addParagaraph (sectionID: number, res: Response) {
        const newParagraph = {
            id: this.model.sections[sectionID].contains.length,
            paragraphHistory: [],
            comments: []
        }

        this.model.sections[sectionID].contains.push(newParagraph);

        return res.status(200).json(newParagraph);
    }

    removeParagraph (sectionID: number, paragraphID: number, res: Response) {
        const newParagraphs = this.model.sections[sectionID].contains.filter((paragraph: any) => paragraph.id !== paragraphID);
        this.model.sections[sectionID].contains = newParagraphs;

        return res.status(200).json({ message: "Paragraph removed" });
    }

    /**
     * Paragraph
    */
    addQuestion (sectionID: number, res: Response) {
        const newQuestion = {
            id: this.model.sections[sectionID].contains.length,
            questionHistory: [],
            comments: []
        }

        this.model.sections[sectionID].contains.push(newQuestion);

        return res.status(200).json(newQuestion);
    }

    removeQuestion (sectionID: number, questionID: number, res: Response) {
        const newQuestions = this.model.sections[sectionID].contains.filter((question: any) => question.id !== questionID);
        this.model.sections[sectionID].contains = newQuestions;

        return res.status(200).json({ message: "Question removed" });
    }

    addAnswer (sectionID: number, questionID: number, answer: any, res: Response) {
        this.model.sections[sectionID].contains[questionID].responses.push(answer);

        return res.status(200).json({ message: "Answer added" });
    }

    removeAnswer (sectionID: number, questionID: number, answerID: number, res: Response) {
        const newAnswers = this.model.sections[sectionID].contains[questionID].responses.filter((answer: any) => answer.id !== answerID);
        this.model.sections[sectionID].contains[questionID].responses = newAnswers;

        return res.status(200).json({ message: "Answer removed" });
    }

    async addComment (sectionID: number, paragraphID: number, comment: any, res: Response) {
        this.model.sections[sectionID].contains[paragraphID].comments.push(comment);

        return res.status(200).json({ message: "Comment added" });
    }

    async removeComment (sectionID: number, paragraphID: number, commentID: number, res: Response) {
        const newComments = this.model.sections[sectionID].contains[paragraphID].comments.filter((comment: any) => comment.id !== commentID);
        this.model.sections[sectionID].contains[paragraphID].comments = newComments;

        return res.status(200).json({ message: "Comment removed" });
    }

    async addImage (sectionID: number, res: Response) {
        // Add image
    }

    async removeImage (sectionID: number, imageID: number, res: Response) {
        // Remove image
    }
}