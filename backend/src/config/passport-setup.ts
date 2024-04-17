import passport from 'passport';

import { v4 as uuidv4 } from 'uuid';

import { Strategy as LocalStrategy } from 'passport-local';

import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

import { UserModel } from '../models';


/**
 * Passport
 * 
 * Passport is an authentication middleware for Node.js. 
 * It is extremely flexible and can be used with any Node.js web framework. 
 * It is designed to be unobtrusive and modular, allowing you to use only the parts you need.
 * 
 * Passport uses the concept of strategies to authenticate requests.
 * When testing, we use the LocalStrategy, which is a username and password strategy.
 * This is because we don't want to use Google's OAuth 2.0 strategy in our tests.
 * 
 * When developing, we use the GoogleStrategy, which is a Google OAuth 2.0 strategy.
 * This is because we want to use Google's OAuth 2.0 strategy in our development environment.
 * 
 * Passport uses the concept of serialization and deserialization.
 * Serialization is the process of converting an object into a format that can be stored or transmitted.
 * Deserialization is the process of converting a serialized object back into its original form.
 * 
 * Passport uses the concept of sessions to store user information.
 * Sessions are used to store user information across multiple requests.
 */
function setupPassport(app: any) {
    if (!process.env.NODE_ENV) {
        throw new Error("NODE_ENV is not defined");
    }

    console.log("NODE_ENV is set to", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "testing") {
        passport.serializeUser((user, done) => done(null, user.id))
        passport.deserializeUser(async (id, done) => {
            const resp = await UserModel.get(id);
            return done(null, resp.body)
        })
        
        passport.use(new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password'
        }, (name, password, done) => {

            const user = {
                oAuthProvider: 'google',
                oAuthID: uuidv4(),
                name
            };
          
            UserModel.findOrCreate(user).then((resp) => {
                done(null, resp.body.user);
            });
        }));

        app.post('/login', passport.authenticate('local', {
            failWithError: true
         }), (req, res) => {
            res.status(200).send('Logged in');
        }, (err, req, res, next) => { 
            console.error('Error during authentication', err);
            res.status(500).send('Authentication failed');
        });

    } else if (process.env.NODE_ENV === "development") {
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
        
    }
}

export { setupPassport };