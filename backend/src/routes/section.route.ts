import express, { Express, Request, Response, Router } from 'express';
import SectionController from '../controllers/routeController/section.controller';


const sectionRoutes: Router = Router();

sectionRoutes.get('/get/:meetingID/:sectionID', SectionController.get)

// Bör ändras till meetingID men vågar inte ifall det förstår koden
sectionRoutes.post('/create/:meetingId', SectionController.create)

sectionRoutes.delete('/delete/:id', SectionController.delete)

sectionRoutes.put('/edit/:id', SectionController.edit)


export { sectionRoutes }