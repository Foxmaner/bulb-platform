import { UserModel }  from '../../models';

import mongoose from 'mongoose';

import { User } from "index";

import { Response as res } from '../utils.service';


/**
 * StaticUserService class
 * This class contains all the static methods that can be used by the UserService class
 */
export class StaticUserService {

    static async findOrCreate(props: User) {
        try {
            const existingUser = await UserModel.findOne({ oAuthID: props.oAuthID });
            if (existingUser) {
                return res.status(200).json({ user: existingUser });
            }

            const user = new UserModel({
                oAuthID: props.oAuthID,
                oAuthProvider: props.oAuthProvider,
                name: props.name,
                accesLevel: "generic",
            });
            await user.save();

            return res.status(201).json({ user });
        } catch (error: any) {
            console.error(error);

            return res.status(500).json({ error: error.message });
        }
    }

    static async create(props: User) {

        try {
            const existingUser = await UserModel.findOne({ name: props.name });
            if (existingUser) {
                return res.status(409).json({ error: 'User already exists' });
            }

            props.accesLevel = "generic";

            const user = new UserModel(props);
            await user.save();

            return res.status(201).json(user);
        } catch (error: any) {
            console.error(error);

            return res.status(500).json({ error: error.message });
        }
    }

    static async createAdmin(props: User) {

        try {
            const existingUser = await UserModel.findOne({ name: props.name });
            if (existingUser) {
                return res.status(409).json({ error: 'User already exists' });
            }

            props.accesLevel = "admin";

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

        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user });
    }

    static async getByOAuthID(oAuthID: string) {
        const User = await UserModel.findOne({ oAuthID });
        if (!User) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(User);
    }

    static async getByEmail(email: string) {

        const User = await UserModel.findOne({ email });
        if (!User) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(User);
    }
}
