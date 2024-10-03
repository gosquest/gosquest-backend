import { Request, Response } from "express";
import { AppError, handleCatchError } from "../middlewares";
import { ValidateSignUpDto, validateLoginDto, validateUpdateDto } from "../utils";
import { generateToken } from "../utils/generate.token";
import { db } from "../db/prisma";
import otpGenerator from "otp-generator"
import { extractPayload } from "../utils/extract.payload";
import { JwtPayload } from "jsonwebtoken";

// create user
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = ValidateSignUpDto(req.body);

    if (error)
      throw new AppError(error.details[0].message, 400);

    const { fullName, roleId } = req.body;
    const userExists = await db.user.findUnique({
      where: { fullName },
    });

    if (userExists)
      throw new AppError("user with that fullName already exists", 401);

    // Generate a unique OTP
    let code = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const savedUser = await db.user.create({
      data: {
        fullName,
        code,
        roleId
      }
    });
    const { code: _, ...userWithoutcode } = savedUser;
    return res.status(201).json({ success: true, message: "Account created successfully", data: userWithoutcode });
  } catch (error: AppError | any) {
    return handleCatchError(error, res);
  }
};

// login user
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = validateLoginDto(req.body);

    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const { fullName, code } = req.body;

    const user = await db.user.findFirst({
      where: { fullName, code },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const role = await db.role.findUnique({
      where: { id: user.roleId }
    })

    const token = await generateToken(user.fullName, role?.name as string);
    const { code: _, ...rest } = user

    return res.status(200).json({ success: true, message: 'Login successfully', data: rest, token });
  } catch (error: AppError | any) {
    return handleCatchError(error, res);
  }
};


export const getAllUsers = async (_req: Request, res: Response): Promise<any> => {
  try {
    const userRole = await db.role.findUnique({
      where: { name: 'User' }
    })

    if (!userRole)
      throw new AppError("User role not found", 404)

    const users = await db.user.findMany({
      where: { roleId: userRole?.id, status: 'Enabled' }
    })

    const usersWithoutCode = users.map((user: { [x: string]: any; code: any; }) => {
      const { code: _, ...rest } = user
      return rest
    })

    return res.status(200).json({ success: true, message: "Users retrieved", data: usersWithoutCode })

  } catch (error: AppError | any) {
    return handleCatchError(error, res);
  }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = validateUpdateDto(req.body)
    if (error)
      throw new AppError(error.details[0].message, 400)

    const { userId } = req.params
    const { fullName, status } = req.body

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        fullName,
        status
      }
    })

    const { code: _, ...rest } = updatedUser
    return res.status(200).json({ success: true, message: "User updated successfully", data: rest })

  } catch (error: AppError | any) {
    return handleCatchError(error, res)
  }
}


export const getAllUsersAdmin = async (_req: Request, res: Response): Promise<any> => {
  try {
    const users = await db.user.findMany()

    return res.status(200).json({ success: true, message: "Users retrieved", data: users })

  } catch (error: AppError | any) {
    return handleCatchError(error, res);
  }
}

export const getAdminUsers = async (_req: Request, res: Response): Promise<any> => {
  try {
    const roles = await db.role.findMany({
      where: {
        name: { in: ['Admin', 'SuperAdmin'] },
      },
    })

    const roleIds: string[] = []
    roles.map((role: { id: string; }) => {
      return roleIds.push(role.id)
    })

    const users = await db.user.findMany({
      where: {
        roleId: { in: roleIds }
      }
    })

    const usersWithoutCode = users.map((user: { [x: string]: any; code: any; }) => {
      const { code: _, ...rest } = user
      return rest
    })

    return res.status(200).json({ success: true, message: 'Users retrieved', data: usersWithoutCode })
  } catch (error: AppError | any) {
    return handleCatchError(error, res)
  }
}


export const validateToken = async (req: Request, res: Response): Promise<any> => {
  try {
    // Get token from Authorization header or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const payload = extractPayload(token);


    if (!payload) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }    

    const userPayload = payload as JwtPayload;

    const user = await db.user.findUnique({
      where: { fullName: userPayload.fullName }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userRole = await db.role.findUnique({
      where: { id: user.roleId }
    });

    return res.status(200).json({ success: true, message: "Token is valid", user, userRole });
  } catch (error: AppError | any) {
    console.log(error);
    
    return handleCatchError(error, res)
  }
};