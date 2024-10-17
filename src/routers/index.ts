import { Router } from "express";
import { UserRouter } from "./user.routes";
import { WebsiteRouter } from "./website.routes";
import { LikeDislikeRouter } from "./rating.routes";

const router  = Router()

router.use("/users", UserRouter)
router.use("/websites", WebsiteRouter)
router.use("/ratings", LikeDislikeRouter)

export default router