import { Request, Response, response } from 'express';
import { UserModel } from '../models';


export default class ExampleController {

    static delete(req: Request, res: Response) {

    }

    static create(req: Request, res: Response) {
        
    }

    static edit(req: Request, res: Response){

    }

    static async signIn(req: Request, res: Response) {
        const authHeader = req.headers.authorization;
        let token = '';
    
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Extract the token part
        }

        if (!token) {
            console.log('Token not found');
            res.status(401).json({message: 'Token not found'});
            return;
        }

        const email = req.body.email;
    
        const resp = await UserModel.getByEmail(email);


        if (resp.statusCode === 200) {
            const user = resp.body;

            user.signIn(token);

            res.status(200).json({message: 'Sign in successful'});
        } else if (resp.statusCode === 404) {

            await UserModel.create({ 
                oAuthID: req.body.id,
                oAuthProvider: "google",
                name: req.body.name,
                token: token
            });

            res.status(200).json({ message: 'User created' });
            return;
        }
        
        //res.status(response.statusCode).json();
    }
}