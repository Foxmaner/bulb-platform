import { Router } from 'express';
import ExampleController from '../controllers/example.controller';


const exampleRoutes: Router = Router();


exampleRoutes.post('/create', ExampleController.create)



export { exampleRoutes };