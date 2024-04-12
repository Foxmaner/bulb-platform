 import express, { Express } from "express";
import { Server } from 'socket.io';
import { connectionHandler } from "./socket";
import { createServer } from 'http';

import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { setupPassport } from './config/passport-setup';


import { authRoutes, exampleRoutes, 
        historyRoutes, imageRoutes, meetingRoutes, 
        paragraphRoutes, sectionRoutes, templateRoutes, 
        wordcloudRoutes } from './routes';


import dotenv from 'dotenv';

dotenv.config();


const run = (DB_URI: string) => {
    //connectDatabase();

    const app = express();
    const httpServer = createServer(app);
    //const io = new Server(httpServer, {});
    
    app.use(cors({
        origin: 'http://localhost:3000', 
        credentials: true 
    }));
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use((req, res, next) => {
        console.log('Accessed route:', req.originalUrl);
        next();
    });
    
    app.use(
        session({
            secret: ['secret123'],
            cookie: {
                secure: process.env.NODE_ENV === "production" ? "true" : "auto",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            },
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: DB_URI,
                collectionName: 'sessions'
            }),
        })
    );
    
    setupPassport(app);
    
    app.use(passport.authenticate("session"));
    app.use(passport.session());
    
    
    app.use("/auth", authRoutes);
    
    const verifySession = (req: any, res: any, next: any) => {
        if (req.session.cookie) {
            next();
        } else {
            
            res.status(401).send('Unauthorized');
        }
    };
    
    app.use(verifySession);
    
    // Middleware that verifies the token
    
    app.post('/verify', (req, res) => {
        res.status(200).send('Authorized');
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

