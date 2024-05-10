/*
*  App.ts is the main entry point for the backend server. 
*  It sets up the express server, the socket.io server, and the routes for the server. 
*/

import express from "express";
import { Server } from "socket.io";
import { connectionHandler } from "./server";
import { createServer } from "http";


import cors from "cors";
import cookieParser from "cookie-parser";
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
    cardRoutes,
} from "./routes";


import dotenv from "dotenv";

import { connectDatabase } from "./config/connection";
import { connectDatabase as testConnectDatabase } from "./config/test-connection";

import { 
    verifySession, 
    verifySocket, 
    wrap, 
    runSessionMiddleware,
    corsConfig,
    updateSessionPath
} from "./middleware/authMiddleware";


dotenv.config();

const run = async () => {
    let db;
    if (process.env.DB === "TEST") {
        console.log("Running in test mode");
        db = await testConnectDatabase();
    }
    else {
        db = await connectDatabase();
    }

    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {});
    
    app.use(cors(corsConfig));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {

        console.log(`Request: ${req.method} ${req.url}`);

        next();
    })
    
    app.use(runSessionMiddleware());

    // Passport setup, for authentication
    setupPassport(app);

    app.use(cookieParser());
    app.use(passport.authenticate("session"));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/auth", authRoutes);
    
    if (process.env.AUTH !== "FALSE") {
        // Middleware that verifies the token to go to the next routes
        app.use(verifySession);

        app.use(function (req: any, res: any, next) {
            res.locals.currentUser = req.user;
            res.locals.session = req.session;

            return next();
        });

        // Middleware that verifies the token when routing
        app.post("/verify", updateSessionPath);
    }

    app.use("/example", exampleRoutes);
    app.use("/history", historyRoutes);
    app.use("/image", imageRoutes);
    app.use("/meeting", meetingRoutes);
    app.use("/paragraph", paragraphRoutes);
    app.use("/section", sectionRoutes);
    app.use("/template", templateRoutes);
    app.use("/wordcloud", wordcloudRoutes); 
    app.use("/card", cardRoutes);

    io.use(wrap(runSessionMiddleware()))
    //io.use(verifySocket);
    io.on('connection', connectionHandler);

    const closeServer = () => {
        httpServer.close();
    };

    return { httpServer, closeServer, io, connectDB: db };
};

export { run };
