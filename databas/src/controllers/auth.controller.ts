import { Request, Response, response } from 'express';
import { UserModel } from '../models';
import { User } from 'index';



export default class ExampleController {

    static delete(req: Request, res: Response) {
        
    }

    static create(req: Request, res: Response) {
        
    }

    static edit(req: Request, res: Response){

    }

    static signUp(req: Request, res: Response) {
        UserModel.create(req.body as User, response);
        
        res.status(200).json({message: 'Sign up successful'})
    }

    static signIn(req: Request, res: Response) {
        // @ts-ignore
        const user = response.json().user;

        const token = req.headers.authorization;

        user.signIn(token, response);
    }
}