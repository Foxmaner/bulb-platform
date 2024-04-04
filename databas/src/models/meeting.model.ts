import { Schema, model } from "mongoose";
import { Document, ObjectId } from "mongoose";

import { Integer } from "validators";

import { WordCloudWord, Section, MeetingHistory, Member } from "index";

import { UserModel } from "./user.model";

interface ISchema extends Document {
    _id: ObjectId,
    progress: Number,
    date: Date,
    wordcloud: [WordCloudWord],
    mainDocumentSections: [Section],
    summaryDocumentSections: [Section, Integer],
    meetingHistory: [MeetingHistory],
    members: [Member]
}

const SchemaMain = new Schema<ISchema>({
    progress: Number,
    date: Date,
    wordcloud: [],
    mainDocumentSections: [],
    summaryDocumentSections: [],
    meetingHistory: [],
    members: []
})

const ModelMain = model<ISchema>("Meetings", SchemaMain);
export { ModelMain as MeetingModel };