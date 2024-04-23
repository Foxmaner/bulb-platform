import { Request, Response } from 'express';
import {multer} from 'multer';

export default class ImageController {

    static create(req: any, res: Response) {
        if (!req.file){
            res.status(400).send('No file uploaded.')
            return;
        }
        
        res.status(200).send('Image uploaded and saved')

    }

    static delete(req: Request, res: Response) {
        
    }
}