import { Router } from "express";
import { CheckAuth } from "../middlewares";
import {
   createLikeDislike,
   getLikedWebsitesByUser
} from "../controllers/rating.controller";

export const LikeDislikeRouter = Router();

LikeDislikeRouter.post("", CheckAuth, createLikeDislike);
LikeDislikeRouter.get("/user/:userId", CheckAuth, getLikedWebsitesByUser);
