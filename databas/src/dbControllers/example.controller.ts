import { ExampleModel }  from '../models';


export class ExampleController {

    static async create(req: any, res: any) {
        try {
            // const example = new Example(req.body);
            // await example.save();
            // res.status(201).send(example);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}
