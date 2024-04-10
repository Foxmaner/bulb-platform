import { Router } from 'express';
import AuthController from '../controllers/auth.controller'

import { verifyGoogleSignUp } from '../middleware/authMiddleware'


const authRoutes: Router = Router();

authRoutes.post('/callback/google/signUp', verifyGoogleSignUp, AuthController.signUp)
    
authRoutes.post('/signIn', AuthController.signUp) 


export { authRoutes }