import { Request, Response } from 'express';
import { UserModel } from '../../models';



export default class HistoryControllerController {

    static create(req: Request, res: Response) {

        res.status(200).json({ message: "Success!" });
    }

    static id(req: Request, res: Response) {
        
    }
}