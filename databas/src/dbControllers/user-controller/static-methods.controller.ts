import { UserModel }  from '../../models';

import { response } from 'express'; 

import mongoose from 'mongoose';

import { User } from "index";
import BaseController from '../base.controller';

import { Response as res } from '../utils';

export class StaticUserController<T> extends BaseController<T> {

    static async create(props: User) {
        try {
            const existingUser = await UserModel.findOne({ name: props.name });
            if (existingUser) {
                return res.status(409).json({ error: 'User already exists' });
            }

            const user = new UserModel(props);
            await user.save();

            return res.status(201).json(user);
        } catch (error: any) {
            console.error(error);

            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(id: string) {
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

    static async list() {
        const companies = await UserModel.find({});
        return res.status(200).json(companies);
    }

    static async get(id: mongoose.Types.ObjectId) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        }

        const User = await UserModel.findById(id);
        if (!User) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(User);
    }

    static async getByEmail(email: string) {
        console.log('GET BY EMAIL', email);

        const User = await UserModel.findOne({ email });
        if (!User) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User found');

        return res.status(200).json(User);
    }
}
