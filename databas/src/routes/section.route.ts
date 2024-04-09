import express, { Express, Request, Response, Router } from 'express';
import SectionController from '../controllers/section.controller';


const app: Express = express();
const sectionRoutes: Router = Router();

sectionRoutes.post('/create/:meetingId', (req: Request, res: Response) => {

})

sectionRoutes.delete('/delete/:id', (req: Request, res: Response) => {

})

sectionRoutes.put('/edit/:id', (req: Request, res: Response) => {

})

export { sectionRoutes }