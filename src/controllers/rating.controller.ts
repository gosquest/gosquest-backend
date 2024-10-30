import { Request, Response } from 'express';
import { db } from '../db/prisma';
import { AppError, handleCatchError } from '../middlewares';

// Toggle like/dislike for a user and website
export const createLikeDislike = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, websiteId, like } = req.body;

        if (typeof like !== 'boolean') {
            throw new AppError('The like field must be a boolean (true or false)', 400);
        }

        const existingLikeDislike = await db.likeDislike.findFirst({
            where: { userId, websiteId }
        });

        if (existingLikeDislike) {
            // Toggle the like field instead of throwing an error
            const updatedLikeDislike = await db.likeDislike.update({
                where: { id: existingLikeDislike.id },
                data: { like }
            });
            return res.status(200).json({
                success: true,
                message: 'Like/Dislike action updated successfully',
                data: updatedLikeDislike
            });
        } else {
            // Create a new like/dislike entry
            const newLikeDislike = await db.likeDislike.create({
                data: { userId, websiteId, like }
            });
            return res.status(201).json({
                success: true,
                message: 'Like/Dislike action recorded successfully',
                data: newLikeDislike
            });
        }
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

// Get all liked websites by user ID
export const getLikedWebsitesByUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;
        const likedWebsites = await db.likeDislike.findMany({
            where: { userId, like: true },
            include: { website: true }
        });

        return res.status(200).json({
            success: true,
            data: likedWebsites.map((likeDislike) => likeDislike.website)
        });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};
