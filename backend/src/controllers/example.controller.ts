import { Request, Response } from 'express';



export default class ExampleController {

    static create(req: Request, res: Response) {
        console.log("Example create called");
        res.status(200);
    }
}