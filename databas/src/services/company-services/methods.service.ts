import { Response } from "express";
import BaseService from "../base.service";


export class MethodCompanyService<T> extends BaseService<T> {

    rename(newName: string, res: Response) {
        this.model.name = newName;

        return res.status(200);
    }
}
