import { Router } from "express";
import { CheckAuth, CheckAdmin } from "../middlewares";
import {
   createWebsite,
   getAllWebsites,
   getWebsiteById,
   updateWebsite,
} from "../controllers";

export const WebsiteRouter = Router();

WebsiteRouter.post("", CheckAdmin, createWebsite);
WebsiteRouter.get("", CheckAuth, getAllWebsites);
WebsiteRouter.get("/:websiteId", CheckAuth, getWebsiteById);
WebsiteRouter.put("/:websiteId", CheckAdmin, updateWebsite);
