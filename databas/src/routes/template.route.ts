import express, { Express, Request, Response, Router } from 'express';
import TemplateController from '../controllers/template.controller';


const templateRoutes: Router = Router();


templateRoutes.put('/create/:templateId', TemplateController.create)

templateRoutes.delete('/delete/:id', TemplateController.delete)

templateRoutes.post('/edit/:id', TemplateController.edit)


export { templateRoutes }