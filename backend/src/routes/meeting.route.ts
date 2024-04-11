import express, { Express, Request, Response, Router } from 'express';
import { UserModel } from '../models';
import MeetingController from '../controllers/meeting.controller';

const meetingRoutes: Router = Router();


meetingRoutes.get('/', MeetingController.load)

meetingRoutes.get('/:id', MeetingController.id)

meetingRoutes.delete('/delete/:id', MeetingController.delete)

meetingRoutes.post('/create', MeetingController.create)

meetingRoutes.put('/edit/:id', MeetingController.edit)

meetingRoutes.post('/edit/post', MeetingController.editPost)


export { meetingRoutes }