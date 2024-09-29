import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { db } from '../db/prisma';

/**
 * Middleware to check user authentication using a JWT token stored in a cookie or Authorization header.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */

export const CheckAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Get token from either Authorization header or cookies
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ authenticated: false, message: 'Authentication token not found' });
        }

        // Fetch both Admin and SuperAdmin roles in a single query
        const roles = await db.role.findMany({
            where: {
                name: { in: ['Admin', 'SuperAdmin'] },
            },
        });

        const admin = roles.find(role => role.name === 'Admin');
        const superAdmin = roles.find(role => role.name === 'SuperAdmin');

        if (!admin || !superAdmin) {
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
            
            // Check if user is Admin or SuperAdmin based on their role
            if (![admin.name, superAdmin.name].includes(decodedToken.roleName)) {
                return res.status(403).json({ authenticated: false, message: 'Unauthorized, admin access required' });
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
