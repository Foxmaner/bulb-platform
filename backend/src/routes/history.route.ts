import express, { Express, Request, Response, Router } from 'express';
import HistoryController from '../controllers/history.controller';


const historyRoutes: Router = Router();


historyRoutes.get('/:id', HistoryController.id)

// vet inte vad addressen är
historyRoutes.post('/create', HistoryController.create)


export { historyRoutes }