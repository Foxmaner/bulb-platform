import express, { Express, Request, Response, Router } from 'express';
import { UserModel } from '../models';
import AuthController from '../controllers/auth.controller'

const app: Express = express();
const authRoutes: Router = Router();

authRoutes.get('/', AuthController.create)  
    



export { authRoutes }