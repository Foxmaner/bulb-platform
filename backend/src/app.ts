 import express, { Express } from "express";
import { Server } from 'socket.io';
import { connectionHandler } from "./socket";
import cors from 'cors';
import { createServer } from 'http';
import {verifyToken} from "./middleware/authMiddleware";

import { authRoutes, exampleRoutes, 
        historyRoutes, imageRoutes, meetingRoutes, 
        paragraphRoutes, sectionRoutes, templateRoutes, 
        wordcloudRoutes } from './routes';

import { connectDatabase } from "./config/test-connection";


connectDatabase();

const corsOrigin = "http://localhost:3000";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        methods: ["GET", "POST"]
    }
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('Accessed route:', req.originalUrl);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(verifyToken);

//app.use("/auth", authRoutes);

// Middleware that verifies the token

app.use("/example", exampleRoutes);
app.use("/history", historyRoutes);
app.use("/image", imageRoutes);
app.use("/meeting", meetingRoutes);
app.use("/paragraph", paragraphRoutes);
app.use("/section", sectionRoutes);
app.use("/template", templateRoutes);
app.use("/wordcloud", wordcloudRoutes);

io.on('connection', connectionHandler);

export { httpServer };
