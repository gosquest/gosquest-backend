import { Request, Response } from "express";
import { db } from "../db/prisma";
import { AppError, handleCatchError } from "../middlewares";
import { validateRoleDto } from "../utils";

/**
 * Create a new role.
 */
export const createRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const { error } = validateRoleDto(req.body);
        if (error) throw new AppError(error.details[0].message, 400);

        const { name, description } = req.body;

        const roleExists = await db.role.findUnique({
            where: { name },
        });

        if (roleExists) throw new AppError("Role already exists", 403);

        const createdRole = await db.role.create({
            data: {
                name,
                description
            },
        });

        return res.status(201).json({ success: true, message: "Role created successfully", createdRole });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

/**
 * Update an existing role by ID.
 */
export const updateRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const { roleId } = req.params;

        const { error } = validateRoleDto(req.body);
        if (error) throw new AppError(error.details[0].message, 400);

        const { name, description, status } = req.body;

        const roleExists = await db.role.findUnique({
            where: { name },
        });

        if (!roleExists) throw new AppError("Role not found", 400);

        const updatedRole = await db.role.update({
            where: {
                id: roleId,
            },
            data: {
                name,
                description,
                status,
            },
        });

        return res.status(200).json({ success: true, message: "Role updated successfully", updatedRole });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

/**
 * Get all roles.
 */
export const getAllRoles = async (_req: Request, res: Response): Promise<any> => {
    try {
        const roles = await db.role.findMany();
        return res.status(200).json({ success: true, roles });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

/**
 * Get a role by ID.
 */
export const getRoleById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { roleId } = req.params;

        const role = await db.role.findUnique({
            where: { id: roleId },
        });

        if (!role) throw new AppError("Role not found", 404);

        return res.status(200).json({ success: true, role });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};