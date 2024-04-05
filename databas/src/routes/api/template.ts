import express, { Express, Request, Response, Router } from 'express';

const app: Express = express();
const router: Router = express.Router();

router.post('/create/:templateId', (req: Request, res: Response) => {

})

router.delete('/delete/:id', (req: Request, res: Response) => {

})

router.put('/edit/:id', (req: Request, res: Response) => {

})