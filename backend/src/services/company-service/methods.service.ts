import { getModelForClass } from "@typegoose/typegoose";

import { Response as res } from "../utils.service";
import mongoose, { Model } from "mongoose";
import { Company } from "index";


export class MethodCompanyService extends mongoose.Model<Company> {

    rename(newName: string) {
        this.name = newName;

        return res.status(200);
    }

}
