import { Request, Response } from 'express';



export default class ImageController {

    static create(req: Request, res: Response) {
        console.log("Create called with request " + req);
        res.status(200).json({ message: "Success!" });
    }

    static delete(req: Request, res: Response) {
        
    }
}