import { Request, Response } from 'express';



export default class HistoryControllerController {

    static create(req: Request, res: Response) {

        console.log("Success!");

        res.status(200).json({ message: "Success!" });
    }

    static id(req: Request, res: Response) {
        
    }
}