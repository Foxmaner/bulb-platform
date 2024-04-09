import express, { Express, Request, Response, Router } from 'express';

const app: Express = express();
const templateRoutes: Router = Router();

templateRoutes.post('/create/:templateId', (req: Request, res: Response) => {

})

templateRoutes.delete('/delete/:id', (req: Request, res: Response) => {

})

templateRoutes.put('/edit/:id', (req: Request, res: Response) => {

})

export { templateRoutes }