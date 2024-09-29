import "dotenv/config"
import jwt from "jsonwebtoken"

import { AppError } from "../middlewares/errors.middlewares"

export const generateToken = async (
  id: string,
  email: string
): Promise<string> => {
  try {
    const secret = process.env.JWT_SECRET_KEY || ""
    const token = jwt.sign({ id, email }, secret, { expiresIn: "3d" })
    return token
  } catch (error: any) {
    throw new AppError(error.message,500)
  }
}