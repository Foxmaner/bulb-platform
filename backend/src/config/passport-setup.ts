import passport from 'passport';

import { v4 as uuidv4 } from 'uuid';

import { Strategy as LocalStrategy } from 'passport-local';

import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

import { UserModel } from '../models';


function setupPassport(app: any) {
    if (!process.env.NODE_ENV) {
        throw new Error("NODE_ENV is not defined");
    }

    console.log("NODE_ENV is set to", process.env.NODE_ENV);

    if (process.env.NODE_ENV === "test") {
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
        
        passport.deserializeUser((id, done) => {
            UserModel.findById(id).exec() // Using exec to ensure proper promise handling
            .then(user => done(null, user))
            .catch(err => done(err, null));
        });
        
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

    } else if (process.env.NODE_ENV === "dev") {
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
                    done(null, resp.body.user);
                });
        
            })
        );
        
    }
}

export { setupPassport };