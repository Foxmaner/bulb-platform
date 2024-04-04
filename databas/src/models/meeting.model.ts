import { Schema } from "mongoose";
import { MethodMeetingController, StaticMeetingController } from "../dbControllers"

import BaseModel from "./base.model";

import { Meeting } from "index";


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
            owner: { type: Schema.Types.ObjectId, required: true },
            mainDocumentSections: { type: [Schema.Types.ObjectId], default: [] },
            summaryDocumentSections: { type: [Schema.Types.ObjectId], default: [] },
            meetingHistory: { type: [Schema.Types.ObjectId], default: [] },
            members: { type: [{userID: Schema.Types.ObjectId}], default: [] }
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
}

const meeting = new MeetingModel().model;

export { meeting as MeetingModel };