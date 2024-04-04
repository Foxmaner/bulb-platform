import { ObjectId, Schema} from "mongoose";

import { getModelForClass } from '@typegoose/typegoose';

import { Response } from "express";


export class MethodMeetingController<T> {
    private userModel: any;

    constructor(model: new <T>(model: new () => T) => MethodMeetingController<T>) {
        this.userModel = getModelForClass(model);
    }


}