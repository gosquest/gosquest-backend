import Joi from "joi";
import { StatusEnum } from "../constants";

const validStatuses = Object.values(StatusEnum);

export const ValidateSignUpDto = (signUp: any) => {
   const signUpSchema = Joi.object({
      fullName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
   });
   return signUpSchema.validate(signUp);
};

export const validateLoginDto = (login: any) => {
   const loginSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(4).required(),
   });
   return loginSchema.validate(login);
};

export const validateRoleDto = (roleDto: any) => {
   const roleSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
   });
   return roleSchema.validate(roleDto);
};

export const validateUpdateDto = (updateDto: any) => {
   const schema = Joi.object({
      fullName: Joi.string().required(),
      status: Joi.string()
         .valid(...validStatuses)
         .required(),
   });

   const { error, value } = schema.validate(updateDto, { abortEarly: false });

   if (error) {
      throw new Error(
         `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
   }

   return value;
};

export const validateWebsiteDto = (websiteDto: any) => {
   const websiteSchema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      url: Joi.string().uri().required(),
      description: Joi.string().min(10).max(1000).required(),
   });

   return websiteSchema.validate(websiteDto, { abortEarly: false });
};

export const validateRatingDto = (data: any) => {
   const schema = Joi.object({
      userId: Joi.string().uuid().required(),
      websiteId: Joi.string().uuid().required(),
      relevance: Joi.number().integer().min(1).max(10).required(),
      impact_to_society: Joi.number().integer().min(1).max(10).required(),
      performance: Joi.number().integer().min(1).max(10).required(),
      progress: Joi.number().integer().min(1).max(10).required(),
      feedback: Joi.string().max(500).optional(),
   });

   return schema.validate(data);
};
