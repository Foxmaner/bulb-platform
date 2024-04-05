import express, { Express, Request, Response, Router } from 'express';
import { MeetingModel } from '../../models';

const app: Express = express();
const router: Router = express.Router();

router.get('/', (req : Request, res : Response) => {
   MeetingModel.list()
}) 

router.get('/:id', (req: Request, res: Response) => {
    
})

router.delete('/delete/:id', (req: Request, res: Response) => {
    
})

router.post('/create', (req: Request, res: Response) => {
    
})

router.put('/edit/:id', (req: Request, res: Response) => {
    
})

router.post('/edit/post', (req: Request, res: Response) => {
    
})

