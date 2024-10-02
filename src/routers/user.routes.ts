import { Router } from "express"
import { createUser, getAdminUsers, getAllUsers, getAllUsersAdmin, loginUser, updateUser, validateToken } from "../controllers"
import { CheckAdmin } from "../middlewares/admin.middleware"

export const UserRouter = Router()

UserRouter.post("/register", CheckAdmin, createUser)
UserRouter.post("/login", loginUser)
UserRouter.get("/all", getAllUsers)
UserRouter.put("/update/:userId", CheckAdmin, updateUser)
UserRouter.get("/all/admin", CheckAdmin, getAllUsersAdmin)
UserRouter.get("/admin", CheckAdmin, getAdminUsers)
UserRouter.get("/validate/token", validateToken)