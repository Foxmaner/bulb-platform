import { MethodCompanyController, StaticCompanyController } from "../dbControllers"

import BaseModel from "./base.model";

import { Company } from "index";


class CompanyModel extends BaseModel<Company, typeof StaticCompanyController, typeof MethodCompanyController> {
    constructor() {  
        const companySchema = {
            name: {
                type: String,
                unique: true,
                validate: {
                    validator: CompanyModel.nameValidator,
                    message: (props: any) => `${props.value}'s length is not within the range [3,63]`
                },
                required: [true, "The company name is required."]
            }
        };
        
        super({
            name: 'Company',
            schema: companySchema,
            staticMethods: StaticCompanyController,
            methods: MethodCompanyController
        });
    }
    
    static nameValidator (v: string) {
        const len = v.length;
        return len > 2 && len < 64;
    }
}

const company = new CompanyModel().model;

export { company as CompanyModel };
