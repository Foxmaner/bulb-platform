import express, { Express, Request, Response, Router } from 'express';
import WordcloudController from '../controllers/wordcloud.controller';


const wordcloudRoutes: Router = Router();


wordcloudRoutes.put('/create/:sectionId', WordcloudController.create)

wordcloudRoutes.delete('/delete/:id', WordcloudController.delete)

wordcloudRoutes.post('/edit/:id', WordcloudController.edit)


export { wordcloudRoutes }