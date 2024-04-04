import { UserModel }  from '../../models';
import { Request, Response } from 'express';

import { getModelForClass } from '@typegoose/typegoose';

import mongoose, { ObjectId } from 'mongoose';

import { User } from "index";


export class StaticUserController<T> {
    private UserModel: any;

    constructor(model: new <T>(model: new () => T) => StaticUserController<T>) {
        this.UserModel = getModelForClass(model);
    }

    static async create(props: User, res: Response) {

        if (!props.name || props.name === "") {
            return res.status(400).json({ error: 'Missing name' });
        }

        try {
            const existingUser = await UserModel.findOne({ name });
            if (existingUser) {
                return res.status(409).json({ error: 'User already exists' });
            }

            const User = new UserModel(props);

            await User.save();

            return res.status(201).json(User);
        } catch (error: any) {
            console.error(error);

            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(id: string, res: Response) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        }

        try {
            const result = await UserModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Object not found." });
            }
            return res.status(200).json({ message: "Object removed." });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "An error occurred." });
        }
    }

    static async list(req: Request, res: Response) {
        const companies = await UserModel.find({});
        return res.json(companies);
    }

    static async get(id: string, res: Response) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        }

        const User = await UserModel.findById(id);
        if (!User) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(User);
    }
}
