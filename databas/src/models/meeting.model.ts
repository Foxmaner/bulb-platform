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
                required: [true, "The company name is required."]
            }
        };
        
        super({
            name: 'Meeting',
            schema: companySchema,
            staticMethods: StaticMeetingController,
            methods: MethodMeetingController
        });
    }
    
    static nameValidator (v: String) {
        const len = v.length;
        return len > 2 && len < 64;
    }
}

const meeting = new MeetingModel().model;

export { meeting as MeetingModel };