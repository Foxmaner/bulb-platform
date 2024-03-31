import { Schema, Document, ObjectId, model } from "mongoose";
import { Integer } from "validators";



interface WordCloudWord {
    word: string,
    weight: Number
}

interface Section {
    id: Integer,
    title: string,
    contains: [Paragraph, Question, Image],
    sectionHistory: []
}

interface SectionHistory {
    userID: ObjectId,
    date: Date,
    contentIndex: Number,
    added: boolean
}

interface Paragraph {
    id: Integer,
    paragraphHistory: [ParagraphHistory],
    comments: [Comment]
}

interface ParagraphHistory {
    userID: ObjectId,
    date: Date,
    textIndex: Number,
    added: boolean,
    text: string
}

interface Comment {
    userID: ObjectId,
    date: Date,
    index: Integer,
    text: string
}

interface Question {
    id: Integer,
    responses: [Answer],
    questionText: Paragraph,
    summaryText: Paragraph,
    questionHistory: [QuestionHistory]
}

interface QuestionHistory {
    userID: ObjectId,
    date: Date,
    answerIndex: Integer,
    added: boolean
}

interface Answer {
    xCoord: Number,
    yCoord: Number,
    size: Number,
    text: Paragraph,
    image: Image
}

interface Image {
    id: Integer,
    url: string
}

interface MeetingHistory {
    userID: ObjectId,
    date: Date,
    sectionID: Integer,
    added: boolean
}

interface Member {
    userID: ObjectId,
    expiryDate: Date,
    accessLevel: Integer
}

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

SchemaMain.pre("save", function (next) {
    next();
});

SchemaMain.methods.addMember = function addMember() {
    // await ModelMain.find({})
}

SchemaMain.methods.logThis = function () {
    console.log("This is a reference to the instance", this);
};

SchemaMain.statics.logModel = function () {
    console.log("This is a reference to the model", this);
};

const ModelMain = model<ISchema>("Meetings", SchemaMain);

export { ModelMain as Meeting, Section };