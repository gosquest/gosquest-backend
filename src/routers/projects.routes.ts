import { Router } from "express";
import { createProject, disableProject, getAllProjects, getProjectById, updateProject, getRatedByUser, getUnratedByUser } from "../controllers";
import { CheckAuth, CheckAdmin } from "../middlewares";

export const ProjectRouter = Router()

ProjectRouter.post('/create', CheckAdmin, createProject)
ProjectRouter.get('/all', CheckAuth, getAllProjects)
ProjectRouter.get('/:projectId', CheckAuth, getProjectById)
ProjectRouter.put('/:projectId', CheckAdmin, updateProject)
ProjectRouter.get('/rated/:userId', CheckAuth, getRatedByUser)
ProjectRouter.get('/unrated/:userId', CheckAuth, getUnratedByUser)
ProjectRouter.post('/disable', CheckAdmin, disableProject)