import { Router } from "express";
import { createRating, getAllRatings, getRatingById } from "../controllers/rating.controller";
import { CheckAdmin, CheckAuth } from "../middlewares";

export const RatingRouter = Router()

RatingRouter.post('', CheckAuth, createRating)
RatingRouter.get('', CheckAdmin, getAllRatings)
RatingRouter.get('/:ratingId', CheckAdmin, getRatingById)