import { Request, Response } from "express";
import { AppError, handleCatchError } from "../middlewares";
import { validateProjectDto } from "../utils";
import { db } from "../db/prisma";

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log(req.body)
        const { error } = validateProjectDto(req.body);
        if (error) throw new AppError(error.details[0].message, 400);

        const { name, fields, team_leader, description, logo, cover_image, link } = req.body;

        const savedProject = await db.project.create({
            data: {
                name,
                fields,
                team_leader,
                description,
                logo,
                cover_image,
                link 
            }
        });
        return res.status(201).json({ success: true, message: "Project created successfully", savedProject });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

// Get a project by its ID
export const getProjectById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { projectId } = req.params;
        const project = await db.project.findUnique({
            where: { id: projectId }
        });

        if (!project) throw new AppError("Project not found", 404);

        return res.status(200).json({ success: true, project });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

// Get all projects
export const getAllProjects = async (_req: Request, res: Response): Promise<any> => {
    try {
        const projects = await db.project.findMany({});
        return res.status(200).json({ success: true, projects });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

// Update a project by its ID
export const updateProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { projectId } = req.params;

        // Validate the project DTO (Data Transfer Object)
        const { error } = validateProjectDto(req.body);
        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        // Check if the project exists
        const existingProject = await db.project.findUnique({
            where: { id: projectId },
        });
        if (!existingProject) {
            throw new AppError('Project not found', 404);
        }

        const { name, fields, team_leader, description, logo, cover_image, link, status } = req.body;

        // Update the project in the database
        const updatedProject = await db.project.update({
            where: { id: projectId },
            data: {
                name,
                fields,
                team_leader,
                description,
                logo,
                cover_image,
                link,
                status
            }
        });

        // Send a success response with the updated project
        return res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            updatedProject
        });
    } catch (error: AppError | any) {
        // Handle the error using a custom error handler
        return handleCatchError(error, res);
    }
};

// Disable a project (sets the status to 'Disabled')
export const disableProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { projectId } = req.params;

        const project = await db.project.findUnique({
            where: { id: projectId }
        });

        if (!project) throw new AppError("Project not found", 404);

        const disabledProject = await db.project.update({
            where: { id: projectId },
            data: { status: "Disabled" }
        });

        return res.status(200).json({ success: true, message: "Project disabled successfully", disabledProject });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

// Get rated projects by user
export const getRatedByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        // Fetch the rated projects for the user
        const ratedProjects = await db.project.findMany({
            where: {
                Rating: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                Rating: true
            }
        });

        res.status(200).json({success: true, message: 'Projects retrieved', data: ratedProjects});
    } catch (error: any) {
        handleCatchError(error, res);
    }
};

// Get unrated projects for user
export const getUnratedByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        // Fetch the unrated projects for the user
        const unratedProjects = await db.project.findMany({
            where: {
                Rating: {
                    none: {
                        userId: userId
                    }
                }
            }
        });

        res.status(200).json({ success: true, message: 'Projects retrieved', data: unratedProjects });
    } catch (error: any) {
        handleCatchError(error, res);
    }
};