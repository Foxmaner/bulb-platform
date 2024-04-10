import { Request, Response } from 'express';

import { UserModel } from '../models';



export default class ExampleController {

    static delete(req: Request, res: Response) {

    }

    static create(req: Request, res: Response) {
        
    }

    static edit(req: Request, res: Response){

    }

    static async signUp(req: Request, res: Response) {
    
        const resp = await UserModel.getByOAuthID(req.body.id);

        console.log('body:', req.body);

        if (resp.statusCode === 200) {
            res.status(200).json({message: 'Already exists'});
        } else if (resp.statusCode === 404) {

            const userCreatResp = await UserModel.create({ 
                oAuthID: req.body.id,
                oAuthProvider: "google",
                name: req.body.name
            });

            if (userCreatResp.statusCode === 201) {
                res.status(201).json({ message: 'User created' });
            } else {
                return res.status(userCreatResp.statusCode).json(userCreatResp.json());
            }
        } else {
            res.status(500);
        }
    }
}