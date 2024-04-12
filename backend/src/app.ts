 import express, { Express } from "express";
import { Server } from 'socket.io';
import { connectionHandler } from "./socket";
import { createServer } from 'http';

import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

import cors from 'cors';
import session from 'express-session';
import cookieSession from 'cookie-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';



import { authRoutes, exampleRoutes, 
        historyRoutes, imageRoutes, meetingRoutes, 
        paragraphRoutes, sectionRoutes, templateRoutes, 
        wordcloudRoutes } from './routes';

import { connectDatabase } from "./config/connection";

import dotenv from 'dotenv';
import { UserModel } from "./models";

dotenv.config();

connectDatabase();


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
    },
    (
        accessToken: string, 
        refreshToken: string, 
        profile: Profile, 
        done: (err: any, user?: any) => void
    ) => {
        const user = {
            oAuthProvider: 'google',
            oAuthID: profile.id,
            name: profile.displayName
        }

        UserModel.findOrCreate(user).then((resp) => {
            console.log(resp)
            done(null, resp.body.user);
        });

    })
);

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
            mongoUrl: process.env.DB_URI,
            collectionName: 'sessions'
        }),
    })
);



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

export { app as httpServer };

