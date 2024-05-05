import { Request, Response } from 'express';
import { UserModel } from '../../models';


export default class UserControllerController {

    static async load(req: any, res: Response) {
        const userID = req.session.passport.user
        const respUser = await UserModel.get(userID);
        const user = respUser.body.user;

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    }

    static async delete(req: any, res: Response) {
        const userID = req.session.passport.user
        const respUser = await UserModel.delete(userID);

        if (respUser.statusCode !== 200) {
            return res.status(403).json({ message: respUser.body.message });
        }

        res.status(200).json({ });
    }
}