import express, { Express } from "express";
import { Server } from "socket.io";
import { connectionHandler } from "./socket";
import { createServer } from "http";


import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import csrf from "csurf";

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

const run = (DB_URI: string) => {
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

    app.use((req, res, next) => {
        console.log("Accessed route:", req.originalUrl);
        next();
    });

   
    app.use(
        session({
            secret: ["secret123"],
            cookie: {
                secure: process.env.NODE_ENV === "production" ? "true" : "auto",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
            },
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: DB_URI,
                collectionName: "sessions",
            }),
        })
    );

    setupPassport(app);

    app.use(cookieParser());
    app.use(passport.authenticate("session"));
    app.use(passport.initialize());
    app.use(passport.session());

    //app.use(csrf({ cookie: true }));
    /*app.use(function (req: any, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.locals.csrfToken = req.csrfToken();
        next();
    });*/

    app.use("/auth", authRoutes);

    app.use(function (req: any, res: any, next) {
        res.locals.currentUser = req.user;
        res.locals.session = req.session;
        next();
    });

    const verifySession = (req: any, res: any, next: any) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).send("Unauthorized");
        }
    };

    app.use(verifySession);

    /*app.use((req: any, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
    });*/

    // Middleware that verifies the token
    app.post("/verify", (req, res) => {
        res.status(200).send("Authorized");
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
