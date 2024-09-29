import { Request, Response } from "express";
import { AppError, handleCatchError } from "../middlewares";
import { validateProjectDto } from "../utils";
import { db } from "../db/prisma";

export const createProject = async ( req: Request, res: Response ): Promise<any> => {
    try {
        const { error } = validateProjectDto(req.body)
        if(error)
            throw new AppError(error.details[0].message, 400)

        const { name, field, team_leader, description, logo, cover_image, link } = req.body

        const savedProject = await db.projects.create({
            data: {
                name,
                field,
                team_leader,
                description,
                logo,
                cover_image,
                link
            }
        })
        return res.status(201).json({ success: true, message: "Project created successfully", savedProject })
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
}