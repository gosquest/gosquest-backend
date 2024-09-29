import { Router } from "express"
import { createUser, getAllUsers, getAllUsersAdmin, loginUser, updateUser } from "../controllers"
import { CheckAdmin } from "../middlewares/admin.middleware"

export const UserRouter = Router()

UserRouter.post("/register", CheckAdmin, createUser)
UserRouter.post("/login", loginUser)
UserRouter.get("/all", getAllUsers)
UserRouter.put("/update/:userId", CheckAdmin, updateUser)
UserRouter.get("/all/admin", CheckAdmin, getAllUsersAdmin)