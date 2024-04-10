import { Response } from "express";
import BaseService from "../base.service";

import { Response as res } from "../utils.service";


export class MethodCompanyService<T> extends BaseService<T> {

    rename(newName: string) {
        this.model.name = newName;

        return res.status(200);
    }
}
