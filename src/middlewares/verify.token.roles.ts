import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { db } from '../db/prisma';

/**
 * Helper function to verify JWT token and check roles.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @param {Array<string>} rolesToCheck - Array of role names to check against the user's role.
 */
export const verifyTokenAndRoles = async (req: Request, res: Response, next: NextFunction, rolesToCheck: any[]): Promise<any> => {
    try {
        // Get token from Authorization header or cookies
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies.token;

        if (!token) {
            return res.status(401).json({ authenticated: false, message: 'Authentication token not found' });
        }

        // Fetch required roles
        const roles = await db.role.findMany({
            where: {
                name: { in: rolesToCheck },
            },
        });

        const roleNames = roles.map((role: { name: any; }) => role.name);
        if (roleNames.length === 0) {
            return res.status(500).json({ authenticated: false, message: 'Roles not properly set in the database' });
        }

        // Verify JWT token
        jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: any, decodedToken: any) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    return res.status(401).json({ authenticated: false, message: 'Token has expired' });
                } else {
                    return res.status(401).json({ authenticated: false, message: 'Invalid token' });
                }
            }

            // Check if the user's role matches any required role
            if (!roleNames.includes(decodedToken.roleName)) {
                return res.status(403).json({ authenticated: false, message: 'Unauthorized' });
            }

            // Attach user info to the request object
            (req as any).user = {
                userId: decodedToken.id,
                fullName: decodedToken.fullName,
            };

            next();
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};