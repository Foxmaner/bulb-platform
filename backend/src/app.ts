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

import { YSocketIO } from 'y-socket.io/dist/server'

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

import { connectDatabase } from "./config/connection";
import { connectDatabase as testConnectDatabase } from "./config/test-connection";

import { 
    verifySession, 
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

        app.use((req: any, res: any, next) => {
            res.locals.currentUser = req.user;
            res.locals.session = req.session;

            return next();
        });
    }
    
    if(process.env.LOGIN === "FALSE") {
        app.use(verifySession);
    }

    app.use((req: any, res: any, next) => {
        res.locals.currentUser = req.user;
        res.locals.session = req.session;
        next();
    });

    // Middleware that verifies the token
    app.post("/verify", (req: any, res) => {
        if (!req.headers.referer) {
            res.status(401).send("Invalid input");
        }

        req.session.cookie.path = req.headers.referer;
        
        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
            }
            res.status(200).send("Authorized");
        });

        // Middleware that verifies the token when routing
        app.post("/verify", updateSessionPath);
    });

    app.use("/example", exampleRoutes);
    app.use("/history", historyRoutes);
    app.use("/image", imageRoutes);
    app.use("/meeting", meetingRoutes);
    app.use("/paragraph", paragraphRoutes);
    app.use("/section", sectionRoutes);
    app.use("/template", templateRoutes);
    app.use("/wordcloud", wordcloudRoutes); 

    const ysocketio = new YSocketIO(io)
    ysocketio.initialize()

    io.use(wrap(runSessionMiddleware()))
    //io.use(verifySocket);
    io.on('connection', connectionHandler);

    const closeServer = () => {
        httpServer.close();
    };

    return { httpServer, closeServer, io, connectDB: db };
};

export { run };
