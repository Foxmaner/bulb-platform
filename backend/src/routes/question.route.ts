import { Router } from 'express';
import QuestionController from '../controllers/routeController/question.controller';


const questionRoutes: Router = Router();


questionRoutes.post('/create/:sectionId', QuestionController.create)

questionRoutes.delete('/delete/:id', QuestionController.delete)

questionRoutes.put('/edit/:id', QuestionController.edit)



export { questionRoutes };