import { Router } from 'express';
import { MeetingController } from '../controllers';

const routes: Router = Router();

routes.get('/user', MeetingController.loadUser);
routes.get('/shared', MeetingController.loadPublished);
routes.get('/published', MeetingController.loadShared);

routes.post('/create', MeetingController.create);

//loadAdvanced has filter, sort, and type in body
routes.post('/advanced', MeetingController.advancedLoad);

//be important to init :id routes after other
routes.delete('/delete/:id', MeetingController.delete);

routes.put('/rename/:id', MeetingController.renameMeeting);

routes.put('/publish/:id', MeetingController.publish);

routes.get('/:id', MeetingController.id);

routes.put('/accesslevel/:id', MeetingController.changeAccessLevel);

routes.post('/publish/:id', MeetingController.publish);

export { routes as meetingRoutes };
