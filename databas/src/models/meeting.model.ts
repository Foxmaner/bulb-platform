import { Schema } from "mongoose";
import { MethodMeetingController, StaticMeetingController } from "../dbControllers"

import BaseModel from "./base.model";

import { Meeting } from "index";

import Utils from "./utils";


class MeetingModel extends BaseModel<Meeting, typeof StaticMeetingController, typeof MethodMeetingController> {
    constructor() {  
        const companySchema = {
            name: {
                type: String,
                validate: {
                    validator: MeetingModel.nameValidator,
                    message: (props: any) => `${props.value}'s length is not within the range [3,63]`
                },
                required: [true, "The meeting name is required."]
            },
            progress: { type: Number, default: 0 },
            completed: { type: Boolean, default: true },
            date: {
                type: Date,
                required: [true, "The creation date is required."]
            },
            mainDocumentSections: { type: [Utils.SectionSchema()], default: [] },
            summaryDocumentSections: { type: {}, default: [] },
            meetingHistory: { type: [Utils.MeetingHistorySchema()], default: [] },
            members: { type: [MeetingModel.MemberSchema()], default: [] }
        };
        
        super({
            name: 'Meeting',
            schema: companySchema,
            staticMethods: StaticMeetingController,
            methods: MethodMeetingController
        });
    }
    
    static nameValidator (v: string) {
        const len = v.length;
        return len > 2 && len < 64;
    }

    static MemberSchema(){
        return {
            userID: Schema.Types.ObjectId,
            expiryDate: {},
            accessLevel: {
                type: Number,
                required: true,
                validate: {
                    validator: Utils.integerValidator,
                    message: "{VALUE} is not an integer value"
                }
            }
        } 
    }
}

const meeting = new MeetingModel().model;

export { meeting as MeetingModel };