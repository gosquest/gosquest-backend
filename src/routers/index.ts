import { Router } from "express";
import { UserRouter } from "./user.routes";
import { RoleRouter } from "./role.routes";
import { ProjectRouter } from "./projects.routes";
import { RatingRouter } from "./rating.routes";

const router  = Router()

router.use("/users", UserRouter)
router.use("/roles", RoleRouter)
router.use("/projects", ProjectRouter)
router.use("/ratings", RatingRouter)

export default router