import "dotenv/config"
import jwt from "jsonwebtoken"

import { AppError } from "../middlewares/errors.middlewares"

export const generateToken = async (
  fullName: string,
  roleName: string
): Promise<string> => {
  try {
    const secret = process.env.JWT_SECRET_KEY || ""
    const token = jwt.sign({ fullName, roleName }, secret, { expiresIn: "3d" })
    return token
  } catch (error: any) {
    throw new AppError(error.message,500)
  }
}