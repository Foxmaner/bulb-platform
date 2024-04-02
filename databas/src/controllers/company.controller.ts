import { CompanyModel }  from '../models';
import { Request, Response } from 'express';

import mongoose from 'mongoose';


export class CompanyController {

    static companyModel = CompanyModel;

    static async clear() {
        await this.companyModel.deleteMany({}).exec();
    }

    static async create(req: Request, res: Response) {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Missing name' });
        }

        try {
            const existingCompany = await CompanyModel.findOne({ name });
            if (existingCompany) {
                return res.status(409).json({ error: 'Company already exists' });
            }

            const company = new CompanyModel(req.body);
            await company.save();
            res.status(201).json(company);
        } catch (error: any) {
            console.error(error);

            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        }

        try {
            const result = await CompanyController.companyModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Object not found." });
            }
            res.status(200).json({ message: "Object removed." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "An error occurred." });
        }
    }

    static async list(req: Request, res: Response) {
        const companies = await CompanyController.companyModel.find({});
        res.json(companies);
    }

    static async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectID." });
        }

        const company = await CompanyController.companyModel.findById(id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.status(200).json(company);
    }
}
