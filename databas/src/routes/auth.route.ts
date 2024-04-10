import { Router } from 'express';
import AuthController from '../controllers/auth.controller'


const authRoutes: Router = Router();


authRoutes.get('/signUp', AuthController.signUp)  
    
authRoutes.get('/signIn', AuthController.signIn) 


export { authRoutes }