import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Server, Socket } from 'socket.io';
import { connectionHandler } from "./socket";
import cors from 'cors';
import { createServer } from 'http';
import verifyToken from "./middleware/authMiddleware";
import {profile} from './tmp';
//Import routes
//import {meeting} from './routes/api/'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const corsOrigin = "http://localhost:3000";

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        methods: ["GET", "POST"]
    }
});

verifyToken(profile.id_token);
//app.use(verifyToken)
app.use(cors());



io.on('connection', connectionHandler);

httpServer.listen(port, () => console.log(`server listening on port : ${port}`));


export default app;