import { Request, Response } from "express";
import { AppError, handleCatchError } from "../middlewares";
import { validateWebsiteDto } from "../utils";
import { db } from "../db/prisma";

// Create a new website
export const createWebsite = async (
   req: Request,
   res: Response
): Promise<any> => {
   try {
      const { error } = validateWebsiteDto(req.body);
      if (error) throw new AppError(error.details[0].message, 400);

      const { name, url, description, logo, cover_image } = req.body;

      const savedWebsite = await db.website.create({
         data: {
            name,
            url,
            description,
            logo,
            cover_image,
         },
      });
      return res
         .status(201)
         .json({
            success: true,
            message: "Website created successfully",
            savedWebsite,
         });
   } catch (error: AppError | any) {
      return handleCatchError(error, res);
   }
};

// Get a website by its ID
export const getWebsiteById = async (
   req: Request,
   res: Response
): Promise<any> => {
   try {
      const { websiteId } = req.params;
      const website = await db.website.findUnique({
         where: { id: websiteId },
         include: {
            likes: true,
         },
      });

      if (!website) throw new AppError("Website not found", 404);
console.log("Niwe uhindura amateka",website);

      return res.status(200).json({ success: true, website });
   } catch (error: AppError | any) {
      return handleCatchError(error, res);
   }
};

// Get all websites
export const getAllWebsites = async (
   _req: Request,
   res: Response
): Promise<any> => {
   try {
      const websites = await db.website.findMany({
         include: {
            likes: true,
         },
      });
      return res.status(200).json({ success: true, websites });
   } catch (error: AppError | any) {
      return handleCatchError(error, res);
   }
};

// Update a website by its ID
export const updateWebsite = async (
   req: Request,
   res: Response
): Promise<any> => {
   try {
      const { websiteId } = req.params;

      // Validate the website DTO (Data Transfer Object)
      const { error } = validateWebsiteDto(req.body);
      if (error) {
         throw new AppError(error.details[0].message, 400);
      }

      // Check if the website exists
      const existingWebsite = await db.website.findUnique({
         where: { id: websiteId },
      });
      if (!existingWebsite) {
         throw new AppError("Website not found", 404);
      }

      const { name, url, description, logo, cover_image } = req.body;

      // Update the website in the database
      const updatedWebsite = await db.website.update({
         where: { id: websiteId },
         data: {
            name,
            url,
            description,
            logo,
            cover_image,
         },
      });

      // Send a success response with the updated website
      return res.status(200).json({
         success: true,
         message: "Website updated successfully",
         updatedWebsite,
      });
   } catch (error: AppError | any) {
      // Handle the error using a custom error handler
      return handleCatchError(error, res);
   }
};
