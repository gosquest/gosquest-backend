import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import { db } from "../db/prisma"; 
import { AppError } from "./errors.middlewares";

/**
 * Middleware to check if the user is authenticated and authorized.
 * @param req - Express Request object
 * @param _res - Express Response object
 * @param next - Next middleware function
 * @param allowedRoles - Optional array of allowed roles
 */
export const CheckAuth = async (req: Request, _res: Response, next: NextFunction, allowedRoles?: string[]) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return next(new AppError("Authorization token is required", 401));
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        
        const user = await db.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        // Check user role if allowedRoles is provided
        if (allowedRoles && !allowedRoles.includes(user.role)) {
            return next(new AppError("Forbidden: insufficient permissions", 403));
        }

        req.user = user; // Attach user object to request
        next();
    } catch (error: any) {
        return next(new AppError("Invalid or expired token", 401));
    }
};
