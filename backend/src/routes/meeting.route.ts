import express, { Express, Request, Response, Router } from 'express';
import { MeetingController } from '../controllers';

const routes: Router = Router();

routes.get('/', MeetingController.load)

routes.get('/:id', MeetingController.id)

routes.delete('/delete/:id', MeetingController.delete)

routes.post('/create', MeetingController.create)

//new name shoud be in body
routes.post('rename/:id', MeetingController.renameMeeting)

routes.post('acesslevel/:id', MeetingController.changeAcessLevel)

//loadAdvanced has filter, sort, and type in body
routes.post('advanced', MeetingController.advancedLoad)





routes.post('/publish/:id', MeetingController.publish)

export { routes as meetingRoutes }