import { Schema } from "mongoose";


export default class Utils {
    static integerValidator (v: number) {
        return Number.isInteger(v);
    }

    static sectionSchema () {
        return new Schema({
            _id: Number,
            title: String,
            contains: { type: [this.questionSchema()], default: [] },
            sectionHistory: { type: [this.questionSchema()], default: [] },
            dateCreated: Date,
            dateDeleted: { type: Date, default: null }
        })
    }

    static paragraphSchema () {
        return new Schema({
            id: Number,
            text: String,
            paragraphHistory: [],
            comments: [],
            dateCreated: Date,
            dateDeleted: { type: Date, default: null }
        })
    }

    static questionSchema () {
        return new Schema({
            id: Number,
            responses: { type: [], default: null },
            questionText: this.paragraphSchema(),
            summaryText: {type: this.paragraphSchema(), default: null},
            questionHistory: [],
            dateCreated: Date,
            dateDeleted: { type: Date, default: null }
        })
    }
}
