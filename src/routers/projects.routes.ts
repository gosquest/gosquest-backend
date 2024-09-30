import { Router } from "express";
import { createProject, disableProject, getAllProjects, getProjectById, updateProject } from "../controllers";
import { CheckAuth, CheckAdmin } from "../middlewares";

export const ProjectRouter = Router()

ProjectRouter.post('/create', CheckAdmin, createProject)
ProjectRouter.get('/all', CheckAuth, getAllProjects)
ProjectRouter.get('/:projectId', CheckAuth, getProjectById)
ProjectRouter.put('/:projectId', CheckAdmin, updateProject)
ProjectRouter.post('/disable', CheckAdmin, disableProject)