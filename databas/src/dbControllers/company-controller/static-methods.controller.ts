import { CompanyModel }  from '../../models';
import { Response } from 'express';

import mongoose from 'mongoose';

import { Company } from "index";
import BaseController from '../base.controller';


export class StaticCompanyController<T> extends BaseController {

    static async create(props: Company, res: Response) {

        if (!props.name || props.name === "") {
            console.log(props.name);
            return res.status(400).json({ error: 'Missing name' });
        }

        try {
            const existingCompany = await CompanyModel.findOne({ name: props.name });
            if (existingCompany) {
                return res.status(409).json({ error: 'Company already exists' });
            }

            const company = new CompanyModel(props);

            await company.save();

            return res.status(201).json(company);
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
            const result = await CompanyModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Object not found." });
            }
            return res.status(200).json({ message: "Object removed." });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "An error occurred." });
        }
    }

    static async list(res: Response) {
        const companies = await CompanyModel.find({});
        return res.json(companies);
    }

    static async get(id: string, res: Response) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        }

        const company = await CompanyModel.findById(id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        return res.status(200).json(company);
    }
}
