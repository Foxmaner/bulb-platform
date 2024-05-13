import express, { Express, Request, Response, Router } from 'express';
import WordcloudController from '../controllers/routeController/wordcloud.controller';


const wordcloudRoutes: Router = Router();


wordcloudRoutes.post('/create/:meetingId', WordcloudController.create)

wordcloudRoutes.delete('/delete/:id', WordcloudController.delete)

wordcloudRoutes.put('/edit/:id', WordcloudController.edit)


export { wordcloudRoutes }