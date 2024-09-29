import { Router } from "express";
import { createProject } from "../controllers/project.controller";
import { CheckAdmin } from "../middlewares/admin.middleware";

export const ProjectRouter = Router()

ProjectRouter.post('/create', CheckAdmin, createProject)