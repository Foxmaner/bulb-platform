import { Response } from "express";
import BaseController from "../base.controller";


export class MethodCompanyController<T> extends BaseController {

    async rename(newName: String, res: Response) {
        this.model.name = newName;
    }
}