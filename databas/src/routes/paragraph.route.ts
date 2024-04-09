import express, { Express, Request, Response, Router } from 'express';
import ParagraphController from '../controllers/paragraph.controller';


const app: Express = express();

const paragraphRoutes: Router = Router();

paragraphRoutes.post('/create/:sectionId', (req: Request, res: Response) => {

})

paragraphRoutes.delete('/delete/:id', (req: Request, res: Response) => {

})

paragraphRoutes.put('/edit/:id', (req: Request, res: Response) => {

})

export { paragraphRoutes };