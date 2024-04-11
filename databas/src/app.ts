import express, { Express } from "express";
import { Server } from 'socket.io';
import { connectionHandler } from "./socket";
import cors from 'cors';
import { createServer } from 'http';
import verifyToken from "./middleware/authMiddleware";
import bodyParser from "body-parser";

import { authRoutes, exampleRoutes, 
        historyRoutes, imageRoutes, meetingRoutes, 
        paragraphRoutes, sectionRoutes, templateRoutes, 
        wordcloudRoutes } from './routes';

import { connectDatabase } from "./config/connection";


const app: Express = express();

connectDatabase();

const corsOrigin = "http://localhost:3000";

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        methods: ["GET", "POST"]
    }
});

//verifyToken(profile.id_token);
app.use(cors());

//app.use("/auth", authRoutes)

//app.use(verifyToken)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes
app.use("/example", exampleRoutes)
app.use("/history", historyRoutes)
app.use("/image", imageRoutes)
app.use("/meeting", meetingRoutes)
app.use("/paragraph", paragraphRoutes)
app.use("/section", sectionRoutes)
app.use("/template", templateRoutes)
app.use("/wordcloud", wordcloudRoutes)


io.on('connection', connectionHandler);


export default httpServer;