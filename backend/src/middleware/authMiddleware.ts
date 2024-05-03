import MongoStore from "connect-mongo";
import session from "express-session";

import dotenv from "dotenv";

dotenv.config()

const runSessionMiddleware = () => {
    const sessionMiddleware = session({
        secret: [process.env.SESSION_SECRET as string],
        cookie: {
            secure: process.env.NODE_ENV === "PROD" ? "true" : "auto",
            sameSite: process.env.NODE_ENV === "PROD" ? "none" : "lax",
            _expires: 1000 * 60 * 60,
        },
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URI,
            collectionName: "sessions",
        }),
    });

    return sessionMiddleware;
}

const verifySession = (req: any, res: any, next: any) => {
    console.log(req.session, req.isAuthenticated(), req.url)

    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log("Unauthorized")
        res.status(401).send("Unauthorized");
    }
};

const verifySocket = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user){
        console.log("Not authorized")
        next(new Error("Not authorized"));
    }
    next();
}

const wrap = expressMiddleware => (socket, next) =>
    expressMiddleware(socket.request, {}, next);

const updateSessionPath = (req: any, res) => {
    if (!req.headers.referer) {
        res.status(401).send("Invalid input");
    }
    
    req.session.cookie.path = req.headers.referer;

    req.session.save(err => {
        if (err) {
            console.error('Session save error:', err);
        }
        return res.status(200).send("Authorized");
    });
}

const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}

export { verifySession, verifySocket, wrap, runSessionMiddleware, corsConfig, updateSessionPath }