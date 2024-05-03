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
            history: { type: [this.paragraphSchema()], default: [] },
            dateCreated: Date,
            dateDeleted: { type: Date, default: null }
        })
    }

    static textSchema () {
        return {
            text: { type: String, default: "" },
            history: { type: [], default: [] },
            comments: { type: [], default: [] }
        }
    }

    static paragraphSchema () {
        return new Schema({
            _id: Number,
            responses: { type: [], default: null },
            title: this.textSchema(),
            body: this.textSchema(),
            history: { type: [], default: [] },
            dateCreated: Date,
            dateDeleted: { type: Date, default: null }
        })
    }
}
