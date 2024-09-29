import { Router } from "express"
import { createRole, updatedRole } from "../controllers"

export const RoleRouter = Router()

RoleRouter.post("/create", createRole)
RoleRouter.put("/update", updatedRole)