import express, { Express } from "express";
import { Server } from "socket.io";
import { connectionHandler } from "./socket";
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

import { connectDatabase } from "./config/connection";


dotenv.config();

const run = () => {
    connectDatabase();

    const app = express();
    const httpServer = createServer(app);
    //const io = new Server(httpServer, {});

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'Content-Type,Authorization'
        })
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(
        session({
            secret: ["secret123"],
            cookie: {
                secure: process.env.NODE_ENV === "production" ? "true" : "auto",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                _expires: 1000 * 60 * 60,
            },
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: process.env.DB_URI,
                collectionName: "sessions",
            }),
        })
    );

    setupPassport(app);

    app.use(cookieParser());
    app.use(passport.authenticate("session"));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/auth", authRoutes);

    const verifySession = (req: any, res: any, next: any) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).send("Unauthorized");
        }
    };

    
    if(process.env.LOGIN === "FALSE"){
        app.use(verifySession);
    }

    app.use(function (req: any, res: any, next) {
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
    });

    app.use("/example", exampleRoutes);
    app.use("/history", historyRoutes);
    app.use("/image", imageRoutes);
    app.use("/meeting", meetingRoutes);
    app.use("/paragraph", paragraphRoutes);
    app.use("/section", sectionRoutes);
    app.use("/template", templateRoutes);
    app.use("/wordcloud", wordcloudRoutes);

    //io.on('connection', connectionHandler);

    const closeServer = () => {
        httpServer.close();
    };

    return { httpServer, closeServer };
};

export { run };
