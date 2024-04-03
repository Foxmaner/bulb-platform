import { CompanyModel }  from '../models';
import { Request, Response } from 'express';

import mongoose from 'mongoose';


interface ICompanyController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    get(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}

class CompanyController {

    static async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { name } = req.body;

        if (!name || name === "") {
            return res.status(400).json({ error: 'Missing name' });
        }

        try {
            const existingCompany = await CompanyModel.findOne({ name });
            if (existingCompany) {
                return res.status(409).json({ error: 'Company already exists' });
            }

            const company = new CompanyModel(req.body);

            await company.save();

            return res.status(201).json(company);
        } catch (error: any) {
            console.error(error);

            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id } = req.params;

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

    static async list(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const companies = await CompanyModel.find({});
        return res.json(companies);
    }

    static async get(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id } = req.params;

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


export { ICompanyController, CompanyController }