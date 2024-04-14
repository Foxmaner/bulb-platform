import express, { Express, Request, Response, Router } from 'express';
import ParagraphController from '../controllers/paragraph.controller';


const paragraphRoutes: Router = Router();


paragraphRoutes.put('/create/:sectionId', ParagraphController.create)

paragraphRoutes.delete('/delete/:id', ParagraphController.delete)

paragraphRoutes.put('/edit/:id', ParagraphController.edit)


export { paragraphRoutes };