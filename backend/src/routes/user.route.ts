import { Router } from 'express';
import UserController from '../controllers/routeController/user.controller';


const userRoutes: Router = Router();


userRoutes.get('/', UserController.load)

userRoutes.get('/all', UserController.loadAll)

userRoutes.post('/delete', UserController.delete)

export { userRoutes }