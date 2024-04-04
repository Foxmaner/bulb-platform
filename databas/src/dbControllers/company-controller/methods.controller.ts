import { ObjectId, Schema} from "mongoose";

import { getModelForClass } from '@typegoose/typegoose';

import { Response } from "express";


export class MethodCompanyController<T> {
    private companyModel: any;

    constructor(model: new <T>(model: new () => T) => MethodCompanyController<T>) {
        this.companyModel = getModelForClass(model);
    }

    async rename(newName: String, res: Response) {
        this.companyModel.name = newName;
    }

}