import express, { Express, Request, Response, Router } from 'express';
import HistoryController from '../controllers/history.controller';


const app: Express = express();
const historyRoutes: Router = Router();


historyRoutes.get('/:id', HistoryController.id)

// vet inte vad addressen är
historyRoutes.put('/create/:id', HistoryController.create)


export { historyRoutes }