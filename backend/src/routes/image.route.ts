import express, { Express, Request, Response, Router } from 'express';
import ImageController from '../controllers/image.controller';
import { upload } from '../middleware/imageMiddleware';

const imageRoutes: Router = Router();

imageRoutes.put('/create', upload.single("file"), ImageController.create);

imageRoutes.delete('/delete/id', ImageController.delete);

export { imageRoutes };