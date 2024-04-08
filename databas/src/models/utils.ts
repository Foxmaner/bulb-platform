import { Schema } from "mongoose";

import { MemberAccessLevel, UserAccessLevel } from "accessLevels" 


export default class Utils {
    static integerValidator (v: number) {
        return Number.isInteger(v);
    }

    static SectionSchema () {
        return {
            section: {
                id: {
                    type: Number,
                    required: true,
                    unique: true,
                    validate: {
                        validator: Utils.integerValidator,
                        message: "{VALUE} is not an integer value"
                    }
                },
                title: String,
                contains: {},
                sectionHistory: [this.SectionHistorySchema()]
            }
        }
    }

    static SectionHistorySchema() {
        return {
            sectionHistory: {
                userID: Schema.Types.ObjectId,
                date: Date,
                contentIndex: Number,
                added: Boolean
            }
        }
    }

    static MeetingHistorySchema() {
        return {
            meetingHistory: {
                userID: Schema.Types.ObjectId,
                date: Date,
                sectionID: {
                    type: Number,
                    required: true,
                    unique: true,
                    validate: {
                        validator: Utils.integerValidator,
                        message: "{VALUE} is not an integer value"
                    }
                },
                added: Boolean
            }
        }
    }

    static memberAccessLevelTypeConverter(accessLevel: number | MemberAccessLevel) {
        const _memberAccessLevels: MemberAccessLevel[] = ["reviewer", "editor", "owner"];

        if (typeof accessLevel === "string") {
            return _memberAccessLevels.indexOf(accessLevel)
        } else if (accessLevel < _memberAccessLevels.length) {
            return _memberAccessLevels[accessLevel];
        } else {
            console.log("Invalid input accessLevelType")
        }
    }

    static userAccessLevelTypeConverter(accessLevel: number | UserAccessLevel) {
        const _userAccessLevels: UserAccessLevel[] = ["generic", "admin"];

        if (typeof accessLevel === "string") {
            return _userAccessLevels.indexOf(accessLevel)
        } else if (accessLevel < _userAccessLevels.length) {
            return _userAccessLevels[accessLevel];
        } else {
            console.log("Invalid input accessLevelType")
        }
    }
}
