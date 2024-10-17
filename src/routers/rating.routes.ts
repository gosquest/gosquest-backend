import { Router } from "express";
import { CheckAuth, CheckAdmin } from "../middlewares";
import {
   createLikeDislike,
   getAllLikeDislikes,
   getLikeDislikeById,
} from "../controllers/rating.controller";

export const LikeDislikeRouter = Router();

LikeDislikeRouter.post("", CheckAuth, createLikeDislike);

LikeDislikeRouter.get("", CheckAdmin, getAllLikeDislikes);

LikeDislikeRouter.get("/:id", CheckAdmin, getLikeDislikeById);
