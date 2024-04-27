import { Schema } from "mongoose";
import { 
    MethodMeetingService, 
    StaticMeetingService,
    MethodImageService,
    MethodParagraphService,
    MethodSectionService,
} from "../services"

import BaseModel from "./base.model";

import { Meeting } from "index";

import Utils from "./utils";
import { MemberAccessLevel } from "accessLevels";

type Methods = (
    MethodMeetingService | 
    MethodImageService | 
    MethodParagraphService | 
    MethodSectionService) & Function;

class MeetingModel extends BaseModel<Meeting, typeof StaticMeetingService, Methods> {
    constructor() {  
        const meetingSchema = {
            name: {
                type: String,
                validate: {
                    validator: MeetingModel.nameValidator,
                    message: (props: any) => `${props.value}'s length is not within the range [3,63]`
                },
                required: [true, "The meeting name is required."]
            },
            progress: { type: Number, default: 0 },
            completed: { type: Boolean, default: false },
            date: {
                type: Date,
                required: [true, "The creation date is required."]
            },
            mainDocumentSections: { type: [Utils.sectionSchema()], default: [] },
            summaryDocumentSections: { type: {}, default: [] },
            meetingHistory: { type: [Utils.sectionSchema()], default: [] },
            members: { type: [MeetingModel.memberSchema()], default: [] },
            published: { type: Boolean, default: false }
        };
        
        super({
            name: 'Meeting',
            schema: meetingSchema,
            staticMethods: StaticMeetingService,
            methods: [
                MethodMeetingService,
                MethodImageService,
                MethodParagraphService,
                MethodSectionService
            ] as any[]
        });
    }
    
    static nameValidator (v: string) {
        const len = v.length;
        return len > 2 && len < 64;
    }

    static memberSchema(){
        return {
            userID: Schema.Types.ObjectId,
            expiryDate: {},
            role: {
                type: String,
                enum: ['reviewer', 'editor', 'owner'],
                required: true,
                // Define a custom getter to map strings to numbers
                get: role => {
                    const map: { [key in MemberAccessLevel]: number } = { 'reviewer': 0, 'editor': 1, 'owner': 2 };
                    return map[role];
                }
            }
        } 
    }

}

const meeting = new MeetingModel().model;

export { meeting as MeetingModel };
