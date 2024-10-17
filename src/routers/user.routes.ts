import { Router } from "express"
import { createUser, deleteUser, getAllUsers, loginUser, updateUser} from "../controllers"
import { CheckAdmin } from "../middlewares/admin.middleware"

export const UserRouter = Router()

UserRouter.post("/register", createUser)
UserRouter.post("/login", loginUser)
UserRouter.get("/all", getAllUsers)
UserRouter.put("/update/:userId", CheckAdmin, updateUser)
UserRouter.delete("/:userId", CheckAdmin, deleteUser)