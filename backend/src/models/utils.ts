import { Schema } from "mongoose";


export default class Utils {
    static integerValidator (v: number) {
        return Number.isInteger(v);
    }

    static sectionSchema () {
        return new Schema({
            _id: Number,
            title: String,
            contains: { type: [this.paragraphSchema()], default: [] },
            sectionHistory: { type: [this.paragraphSchema()], default: [] },
            dateCreated: Date,
            dateDeleted: { type: Date, default: null }
        })
    }

    static paragraphSchema () {
        return new Schema({
            _id: Number,
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
            responses: [],
            questionText: this.paragraphSchema(),
            summaryText: this.paragraphSchema(),
            questionHistory: [],
            dateCreated: Date,
            dateDeleted: { type: Date, default: null }
        })
    }
}
