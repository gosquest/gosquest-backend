import { NextFunction, Request, Response } from "express";
import { verifyTokenAndRoles } from "./verify.token.roles";

/**
 * Middleware to check if the user has any role (User, Admin, or SuperAdmin).
 */
export const CheckAuth = (req: Request, res: Response, next: NextFunction) => {
    verifyTokenAndRoles(req, res, next, ['User', 'Admin', 'SuperAdmin']);
};
