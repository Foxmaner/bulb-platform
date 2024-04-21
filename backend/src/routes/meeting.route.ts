import express, { Express, Request, Response, Router } from 'express';
import { MeetingController } from '../controllers';

const routes: Router = Router();

routes.get('/', MeetingController.load);

routes.post('/create', MeetingController.create);

routes.get('/published', MeetingController.loadPublished);

//loadAdvanced has filter, sort, and type in body
routes.post('/advanced', MeetingController.advancedLoad);

//be important to init :id routes after other
routes.delete('/delete/:id', MeetingController.delete);

routes.put('/rename/:id', MeetingController.renameMeeting);

routes.post('/publish/:id', MeetingController.publish);

routes.get('/:id', MeetingController.id);
routes.post('/acesslevel/:id', MeetingController.changeAcessLevel);

routes.post('/publish/:id', MeetingController.publish);

export { routes as meetingRoutes };
