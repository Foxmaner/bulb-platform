import express, { Express } from "express";
import { Server } from "socket.io";
import { connectionHandler } from "./socket";
import { createServer } from "http";

import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

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
import { UserModel } from "./models";
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

    app.use(cookieParser());
    app.use(passport.authenticate("session"));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        const resp = await UserModel.get(id);
        return done(null, resp.body)
    })

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/redirect",
                passReqToCallback: true,
            },
            (request, accessToken, refreshToken, profile, done) => {
                const user = {
                    oAuthProvider: "google",
                    oAuthID: profile.id,
                    name: profile.displayName,
                };

                UserModel.findOrCreate(user).then((resp) => {
                    done(null, resp.body.user);
                });
            }
        )
    );

    app.use("/auth", authRoutes);

    const verifySession = (req: any, res: any, next: any) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).send("Unauthorized");
        }
    };


    // Middleware that verifies the token
    app.post("/verify", verifySession, (req, res) => {
        res.status(200).send("Authorized");
    });

    app.use("/example", exampleRoutes);
    app.use("/history", verifySession, historyRoutes);
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
