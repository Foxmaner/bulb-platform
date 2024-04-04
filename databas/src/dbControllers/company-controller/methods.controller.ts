import { Response } from "express";
import BaseController from "../base.controller";


export class MethodCompanyController<T> extends BaseController<T> {

    async rename(newName: string, res: Response) {
        this.model.name = newName;

        return res.status(200);
    }
}