import { Schema, model } from "mongoose";
import { Document, ObjectId } from "mongoose";

import { Integer } from "validators";

import { WordCloudWord, Section, MeetingHistory, Member } from "index";


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

SchemaMain.methods.addMember = function addMember() {
    // await UserModel.find({})

    console.log("Aaa");
}

const ModelMain = model<ISchema>("Meetings", SchemaMain);

export { ModelMain as MeetingModel };