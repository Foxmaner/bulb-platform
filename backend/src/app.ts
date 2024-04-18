import express, { Express } from "express";
import { Server } from "socket.io";
import { connectionHandler } from "./server";
import { createServer } from "http";


import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";

import { setupPassport } from "./config/passport-setup";

import {
    authRoutes,
    exampleRoutes,
    historyRoutes,
    imageRoutes,
    meetingRoutes,
    paragraphRoutes,
    sectionRoutes,
    templateRoutes,
    wordcloudRoutes,
} from "./routes";


import dotenv from "dotenv";

import { connectDatabase } from "./config/test-connection";
import { 
    verifySession, 
    verifySocket, 
    wrap, 
    sessionMiddleware,
    corsConfig,
    updateSessionPath
} from "./middleware/authMiddleware";


dotenv.config();

const run = () => {
    //connectDatabase();

    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {});
    app.use(cors(corsConfig));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(sessionMiddleware);

    setupPassport(app);

    app.use(cookieParser());
    app.use(passport.authenticate("session"));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/auth", authRoutes);

    app.use(verifySession);

    app.use(function (req: any, res: any, next) {
        res.locals.currentUser = req.user;
        res.locals.session = req.session;

        next();
    });

    // Middleware that verifies the token
    app.post("/verify", updateSessionPath);

    app.use("/example", exampleRoutes);
    app.use("/history", historyRoutes);
    app.use("/image", imageRoutes);
    app.use("/meeting", meetingRoutes);
    app.use("/paragraph", paragraphRoutes);
    app.use("/section", sectionRoutes);
    app.use("/template", templateRoutes);
    app.use("/wordcloud", wordcloudRoutes); 

    //io.use(wrap(sessionMiddleware))
    //io.use(verifySocket);
    io.on('connection', connectionHandler);

    const closeServer = () => {
        httpServer.close();
    };

    return { httpServer, closeServer, io };
};

export { run };
