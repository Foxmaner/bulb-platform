import { CompanyModel }  from '../models';
import { Request, Response } from 'express';

import mongoose, { Model } from 'mongoose';


interface ICompanyController {
    new(): CompanyController;
    create(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
}


function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}

@staticImplements<ICompanyController>()
class CompanyController {

    static async create(req: Request, res: Response): Promise<void> {
        console.log('Company:', req.body);
        const { name } = req.body;

        if (!name && name !== "") {
            res.status(400).json({ error: 'Missing name' });
            return;
        }

        try {
            const existingCompany = await CompanyModel.findOne({ name });
            if (existingCompany) {
                res.status(409).json({ error: 'Company already exists' });
                return;
            }

            const company = new CompanyModel(req.body);

            await company.save();

            console.log('Company created:', company);

            res.status(201).json(company);
        } catch (error: any) {
            console.error(error);

            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid ObjectID." });
            return;
        }

        try {
            const result = await CompanyModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                res.status(404).json({ message: "Object not found." });
                return;
            }
            res.status(200).json({ message: "Object removed." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "An error occurred." });
        }
    }

    static async list(req: Request, res: Response): Promise<void> {
        const companies = await CompanyModel.find({});
        res.json(companies);
    }

    static async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid ObjectID." });
            return;
        }

        const company = await CompanyModel.findById(id);
        if (!company) {
            res.status(404).json({ error: 'Company not found' });
            return;
        }

        res.status(200).json(company);
    }
}


export { ICompanyController, CompanyController }