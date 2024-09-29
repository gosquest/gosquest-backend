import { Router } from "express";
import { UserRouter } from "./user.routes";
import { otpRoutes } from "./otp.routes";

const router  = Router()
router.use("/api/v1/users", UserRouter)
router.use("/api/v1/email", otpRoutes)

export default router