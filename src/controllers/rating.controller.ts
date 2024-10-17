import { Request, Response } from 'express';
import { db } from '../db/prisma';
import { AppError, handleCatchError } from '../middlewares';

export const createLikeDislike = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, websiteId, like } = req.body;

        if (typeof like !== 'boolean') {
            throw new AppError('The like field must be a boolean (true or false)', 400);
        }

        // Check if the user has already liked or disliked the website
        const existingLikeDislike = await db.likeDislike.findFirst({
            where: { userId, websiteId }
        });

        if (existingLikeDislike) {
            throw new AppError("You've already liked or disliked this website", 401);
        }

        // Create the like or dislike in the database
        const newLikeDislike = await db.likeDislike.create({
            data: req.body
        });

        return res.status(201).json({
            success: true,
            message: 'Like/Dislike action recorded successfully',
            data: newLikeDislike
        });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

export const getAllLikeDislikes = async (_req: Request, res: Response): Promise<any> => {
    try {
        // Fetch all like/dislike actions from the database
        const likeDislikes = await db.likeDislike.findMany({
            include: {
                user: true,
                website: true
            }
        });

        return res.status(200).json({
            success: true,
            data: likeDislikes
        });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

export const getLikeDislikeById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Fetch like/dislike action by ID from the database
        const likeDislike = await db.likeDislike.findUnique({
            where: { id },
            include: {
                user: true, 
                website: true
            }
        });

        if (!likeDislike) {
            throw new AppError('Like/Dislike action not found', 404);
        }

        return res.status(200).json({
            success: true,
            data: likeDislike
        });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};
