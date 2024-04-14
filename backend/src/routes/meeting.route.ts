import express, { Express, Request, Response, Router } from 'express';
import { MeetingController } from '../controllers';

const routes: Router = Router();

routes.get('/', MeetingController.load)

routes.get('/:id', MeetingController.id)

routes.delete('/delete/:id', MeetingController.delete)

routes.post('/create', MeetingController.create)

routes.put('/edit/:id', MeetingController.edit)

routes.post('/edit/post', MeetingController.editPost)

export { routes as meetingRoutes }