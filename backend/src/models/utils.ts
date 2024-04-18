import { Schema } from "mongoose";

import { MemberAccessLevel, UserAccessLevel } from "accessLevels" 


export default class Utils {
    static integerValidator (v: number) {
        return Number.isInteger(v);
    }

    static sectionSchema () {
        return {
            section: {
                _id: Schema.Types.ObjectId,
                title: String,
                contains: {},
                sectionHistory: [this.sectionHistorySchema()]
            }
        }
    }

    static sectionHistorySchema() {
        return {
            sectionHistory: {
                userID: Schema.Types.ObjectId,
                date: Date,
                contentIndex: Number,
                added: Boolean
            }
        }
    }
}
