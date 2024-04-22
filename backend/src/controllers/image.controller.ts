import { Request, Response } from 'express';


export default class ImageController {
    static create(req: Request, res: Response) {
        console.log(req.file.fileName);
        res.status(200).json({ message: "Success!" });
    }

    static delete(req: Request, res: Response) {
        
    }
}