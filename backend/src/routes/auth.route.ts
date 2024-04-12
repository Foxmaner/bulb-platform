import { CookieOptions, Request, Response, Router } from "express";
import passport from "passport";

const router: Router = Router();


router.get(
    "/google",
    passport.authenticate("google", {
        scope: [ 'email', 'profile' ],
    })
);

router.get(
    "/google/redirect",
    passport.authenticate('google', { 
        failureRedirect: 'http://localhost:3000/auth/signIn',
        successRedirect: 'http://localhost:3000/meetings'
    })
);

router.post('/logout', (req: any, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        req.logout(() => {
            res.clearCookie('connect.sid', { path: '/' });
            res.status(200).send('Logged out');
        });
    });
});

export { router as authRoutes };
