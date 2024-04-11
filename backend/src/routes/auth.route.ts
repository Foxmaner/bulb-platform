import { Router } from 'express';
import AuthController from '../controllers/auth.controller'



const authRoutes: Router = Router();

//authRoutes.post('/callback/google/signIn', AuthController.signIn)
    


export { authRoutes }