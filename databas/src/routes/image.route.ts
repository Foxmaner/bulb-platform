import express, { Express, Request, Response, Router } from 'express';
import ImageController from '../controllers/image.controller';


const imageRoutes: Router = Router();

imageRoutes.put('/create/sectionId', ImageController.create)

imageRoutes.delete('/delete/id', ImageController.delete)


export { imageRoutes };