import { Schema, Document, ObjectId, model } from "mongoose";
import { CompanyModel } from "./company.model"
import BaseModel from "./base.model";

import Utils from "./utils";

import { User } from "index";

import { MethodUserController, StaticUserController } from "../dbControllers/user-controller";

class UserModel extends BaseModel<User, typeof StaticUserController, typeof MethodUserController> {
    constructor() {

        const userSchema = {
            accesLevel: {
                type: Number,
                required: true,
                unique: true,
                validate: {
                    validator: Utils.integerValidator,
                    message: "{VALUE} is not an integer value"
                }
            },
            companyID:  {
                type: Schema.Types.ObjectId,
                validate: {
                    validator: UserModel.companyIDValidator,
                    message: (props: any) => "Couldn't identify the company, the ObjectId is invalid."
                }
            },
            accessibleMeetings: [Schema.Types.ObjectId],
            token: String
        }

        super({
            name: 'User',
            schema: userSchema,
            staticMethods: StaticUserController,
            methods: MethodUserController
        });
    }

    static async companyIDValidator (v: ObjectId) {
        const result = await CompanyModel.findOne({_id:v})
        return Boolean(result);
    }
}


const user = new UserModel().model;

export { user as UserModel };