import { NextFunction, Request, Response } from "express";
import { verifyTokenAndRoles } from "./verify.token.roles";

/**
 * Middleware to check if the user is Admin or SuperAdmin.
 */
export const CheckAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyTokenAndRoles(req, res, next, ['Admin', 'SuperAdmin']);
};