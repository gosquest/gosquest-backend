import { Response, Request } from "express";
import { db } from "../../db/prisma";
import { AppError } from "../../middlewares";
import { validateRoleDto } from "../../utils";
import { handleCatchError } from "../../middlewares";

export const createRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const { error } = validateRoleDto(req.body);
        if (error) throw new AppError(error.details[0].message, 400);

        const { name, description, status } = req.body;

        const roleExists = await db.role.findUnique({
            where: { name },
        });

        if (roleExists) throw new AppError("Role already exists", 403);

        const createdRole = await db.role.create({
            data: {
                name,
                description,
                status,
            },
        });

        return res.status(201).json({ success: true, message: "Role created successfully", createdRole });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};

export const updatedRole = async (req: Request, res: Response): Promise<any> => {
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

        return res.status(201).json({ success: true, message: "Role updated successfully", updatedRole });
    } catch (error: AppError | any) {
        return handleCatchError(error, res);
    }
};