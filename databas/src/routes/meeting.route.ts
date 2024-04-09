import express, { Express, Request, Response, Router } from 'express';
import { UserModel } from '../models';
import MeetingController from '../controllers/meeting.controller';

const app: Express = express();
const meetingRoutes: Router = Router();



meetingRoutes.get('/', (req : Request, res : Response) => {
   
   res.json()
}) 

meetingRoutes.get('/:id', (req: Request, res: Response) => {
   
})

meetingRoutes.delete('/delete/:id', (req: Request, res: Response) => {
    
})

meetingRoutes.post('/create', (req: Request, res: Response) => {
    
})

meetingRoutes.put('/edit/:id', (req: Request, res: Response) => {
    
})

meetingRoutes.post('/edit/post', (req: Request, res: Response) => {
    
})

export { meetingRoutes }