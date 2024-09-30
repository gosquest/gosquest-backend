import { Router } from "express"
import { createRole, updateRole, getAllRoles, getRoleById } from "../controllers"
import { CheckAdmin, CheckAuth } from "../middlewares"

export const RoleRouter = Router()

RoleRouter.post("", CheckAdmin, createRole)
RoleRouter.put("/:roleId", CheckAdmin, updateRole)
RoleRouter.get("", CheckAuth,  getAllRoles)
RoleRouter.get("/:roleId", CheckAuth, getRoleById)