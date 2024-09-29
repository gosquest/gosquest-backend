import { Router } from "express";
import { UserRouter } from "./user.routes";
import { RoleRouter } from "./role.routes";
import { ProjectRouter } from "./projects.routes";

const router  = Router()
router.use("/api/v1/users", UserRouter)
router.use("/api/v1/roles", RoleRouter)
router.use("/api/v1/projects", ProjectRouter)

export default router