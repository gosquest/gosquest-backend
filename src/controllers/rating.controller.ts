import { Request, Response } from 'express';
import { db } from '../db/prisma';
import { AppError, handleCatchError } from '../middlewares';
import { validateRatingDto } from '../utils';

export const createRating = async (req: Request, res: Response): Promise<any> => {
    try {

        const { error } = validateRatingDto(req.body)
        if(error)
            throw new AppError(error.details[0].message, 400)

        const ratingExists = await db.rating.findFirst({
            where: { userId: req.body.userId, projectId: req.body.projectId }
        })

        if(ratingExists)
            throw new AppError("Can't rate same project twice", 401)

        // Create the rating in the database
        const rating = await db.rating.create({
            data: req.body
        });

        return res.status(201).json({
            success: true,
            message: 'Rating created successfully',
            data: rating
        });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

export const getAllRatings = async (_req: Request, res: Response): Promise<any> => {
    try {
        // Fetch all ratings from the database
        const ratings = await db.rating.findMany({
            include: {
                user: true,
                project: true
            }
        });

        return res.status(200).json({
            success: true,
            data: ratings
        });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

export const getRatingById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { ratingId } = req.params;

        // Fetch rating by ID from the database
        const rating = await db.rating.findUnique({
            where: { id: ratingId },
            include: {
                user: true, 
                project: true
            }
        });

        if (!rating) {
            throw new AppError('Rating not found', 404);
        }

        return res.status(200).json({
            success: true,
            rating
        });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};
