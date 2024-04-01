import { CompanyModel }  from '../models';
import { Request, Response } from 'express';


export class CompanyController {

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
            res.status(500).json({ error: error.message });
        }
    }
}
