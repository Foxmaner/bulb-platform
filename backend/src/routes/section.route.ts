import express, { Express, Request, Response, Router } from 'express';
import SectionController from '../controllers/section.controller';


const sectionRoutes: Router = Router();

sectionRoutes.post('/create/:meetingId', SectionController.create)

sectionRoutes.delete('/delete/:id', SectionController.delete)

sectionRoutes.put('/edit/:id', SectionController.edit)


export { sectionRoutes }