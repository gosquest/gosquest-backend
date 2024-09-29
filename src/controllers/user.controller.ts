import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppError, handleCatchError } from "../middlewares";
import { ValidateSignUpDto, validateLoginDto, validateUpdateDto } from "../utils";
import { generateToken } from "../utils/generate.token";
import { db } from "../db/prisma";
import { usernameRegex } from "../constants";

// create user
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = ValidateSignUpDto(req.body);

    if (error)
      throw new AppError(error.details[0].message, 400);

    const { username, email, password, fullName, phoneNumber } = req.body;
    const userExists = await db.user.findUnique({
      where: { email },
    });

    if (userExists)
      throw new AppError("user with that email already exists", 401);

    if (!usernameRegex.test(username))
      throw new AppError('Invalid username. It must be alphanumeric, may contain hyphens, but cannot start or end with one, and has a max length of 39 characters.', 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await db.role.findUnique({
      where: { name: 'User' }
    })

    const savedUser = await db.user.create({
      data: {
        fullName,
        username,
        email,
        phoneNumber,
        password: hashedPassword,
        roleId: role?.id as string
      },
    });
    const { password: _, ...userWithoutPassword } = savedUser;
    return res.status(201).json({ success: true, message: "Account created successfully", user: userWithoutPassword });
  } catch (error: AppError | any) {
    return handleCatchError(error, res);
  }
};

// verify account
export const verifyAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, otp } = req.body;

    // Find the latest otp document for the given email
    const document = await db.userVerificationCodes.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    // Find the user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!document)
      throw new AppError("Invalid otp: Email not found", 404)

    if (document.otp !== otp)
      throw new AppError("Invalid otp", 400)

    if (!user)
      throw new AppError("User not found", 404)

    // Set the user as verified
    await db.user.update({
      where: { email },
      data: { verified: true },
    });

    return res.status(200).json({ success: true, message: 'Account verified successfully' });
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

    const { email, password } = req.body;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("invalid credentials", 401);
    }

    if (!user.verified) {
      throw new AppError("please verify your account before login", 401);
    }

    if (!user.password) {
      throw new AppError("the provided email does not use email auth.", 402);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("invalid credentials", 401);
    }

    const token = await generateToken(user.id.toString(), user.email);
    const { password: _, ...rest } = user

    return res.status(200).json({ rest, token });
  } catch (error: AppError | any) {
    return handleCatchError(error, res);
  }
};

// update profile details
export const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params
    const { error } = validateUpdateDto(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: req.body,
    });

    return res.status(200).json({ user: updatedUser });
  } catch (error: AppError | any) {
    return handleCatchError(error, res);
  }
};