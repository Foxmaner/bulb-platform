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
            sectionHistory: { type: [this.sectionHistorySchema()], default: [] }
        })
    }

    static paragraphSchema () {
        return new Schema({
            _id: Number,
            text: String,
            paragraphHistory: [],
            comments: []
        })
    }

    static questionSchema () {
        return new Schema({
            id: Number,
            responses: [],
            questionText: this.paragraphSchema(),
            summaryText: this.paragraphSchema(),
            questionHistory: []
        })
    }

    static sectionHistorySchema() {
        return new Schema({
            userID: Schema.Types.ObjectId,
            date: Date,
            change: String,
            added: Boolean
        })
    }
}
