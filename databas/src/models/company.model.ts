import { CompanyController, ICompanyController } from "../controllers";

import BaseModel from "./base.model";


interface ISchema {
    name: string
}

class CompanyModel extends BaseModel<ISchema, ICompanyController> {
    constructor() {
        const companySchema = {
            name: String
        };

        super({ 
            name: 'Company', 
            schema: companySchema, 
            controller: CompanyController
        });
    }
}

const company = new CompanyModel().model;

export { company as CompanyModel };