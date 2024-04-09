import express, { Express, Request, Response, Router } from 'express';
import HistoryController from '../controllers/history.controller';


const app: Express = express();
const historyRoutes: Router = Router();

historyRoutes.post('/create/:id', (req: Request, res: Response) => {

})

historyRoutes.get('/:id', (req: Request, res: Response) => {

})

export { historyRoutes }