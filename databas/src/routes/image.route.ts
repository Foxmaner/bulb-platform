import express, { Express, Request, Response, Router } from 'express';
import ImageController from '../controllers/image.controller';

const app: Express = express();
const imageRoutes: Router = Router();

imageRoutes.post('/create', ImageController.create)

export { imageRoutes };