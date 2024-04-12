import { Request, Response, Router } from "express";
import passport from "passport";

const router: Router = Router();


router.get(
    "/google",
    passport.authenticate("google", {
        scope: "profile",
    })
);

router.get(
    "/google/redirect",
    passport.authenticate("google", { session: true,
        failureRedirect: "http://localhost:3000/auth/signIn",
        successRedirect: "http://localhost:3000/meetings",
     }),
    (req, res) => {
        res.redirect(`http://localhost:3000`);

    }
);

export { router as authRoutes };
