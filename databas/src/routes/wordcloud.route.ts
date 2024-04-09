import express, { Express, Request, Response, Router } from 'express';

const app: Express = express();
const wordcloudRoutes: Router = Router();

wordcloudRoutes.post('/create/:sectionId', (req: Request, res: Response) => {

})

wordcloudRoutes.delete('/delete/:id', (req: Request, res: Response) => {

})

wordcloudRoutes.put('/edit/:id', (req: Request, res: Response) => {

})

export { wordcloudRoutes }