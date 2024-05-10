import express, { Express, Request, Response, Router } from 'express';
import CardController from '../controllers/routeController/card.controller';


const cardRoutes: Router = Router();


cardRoutes.put('/create/', CardController.create)

cardRoutes.delete('/delete/:id', CardController.delete)

cardRoutes.post('/edit/:id', CardController.edit)


export { cardRoutes }