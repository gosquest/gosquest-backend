import { Request, Response, Router } from "express"
import { createUser, loginUser, updateProfile, verifyAccount } from "../controllers"
import passport from "passport"

export const UserRouter = Router()

UserRouter.post("/register", createUser)
UserRouter.post("/verify/:id", verifyAccount)
UserRouter.post("/login", loginUser)
UserRouter.patch("/updateProfile/:userId", updateProfile)

// @ts-ignore
UserRouter.get('/google/failed', (req: Request, res: Response) => {    
    res.status(401).json({
        success: false,
        message: "Account with that email not found. please create one",
    });
});

UserRouter.get('/google/success', (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json({ message: "User login successful", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});

UserRouter.get('/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
);

UserRouter.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/api/v1/users/google/failed' }),
    (req: Request, res: Response) => {
        if (req.user && (req.user as any).token) {
            res.cookie('token', (req.user as any).token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
            });
            res.redirect(process.env.CLIENT_URL as string);
        } else {
            res.redirect(process.env.CLIENT_URL as string + '/auth/login');
        }
    }
);
