import { ObjectId, Schema} from "mongoose";

import { getModelForClass } from '@typegoose/typegoose';

import { Response } from "express";


export class MethodUserController<T> {
    private userModel: any;

    constructor(model: new <T>(model: new () => T) => MethodUserController<T>) {
        this.userModel = getModelForClass(model);
    }

}