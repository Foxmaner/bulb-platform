import { StaticTemplateService, MethodTemplateService } from "../services"

import BaseModel from "./base.model";

import { Template } from "index";

import Utils from "./utils";


class TemplateModel extends BaseModel<Template, typeof StaticTemplateService, typeof MethodTemplateService> {
    constructor() {  
        const companySchema = {
            name: {
                type: String,
                validate: {
                    validator: TemplateModel.nameValidator,
                    message: (props: any) => `${props.value}'s length is not within the range [3,63]`
                },
                required: [true, "The meeting name is required."]
            },
            date: {
                type: Date,
                required: [true, "The creation date is required."]
            },
            sections: { type: [Utils.sectionSchema()], default: [] },
            summerySections: { type: {}, default: [] }
        };
        
        super({
            name: 'Template',
            schema: companySchema,
            staticMethods: StaticTemplateService,
            methods: MethodTemplateService
        });
    }
    
    static nameValidator (v: string) {
        const len = v.length;
        return len > 2 && len < 64;
    }
}

const template = new TemplateModel().model;

export { template as TemplateModel };
