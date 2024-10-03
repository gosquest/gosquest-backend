import Joi from "joi";
import { StatusEnum } from "../constants";

const validStatuses = Object.values(StatusEnum);

export const ValidateSignUpDto = (signUp: any) => {
  const signUpSchema = Joi.object({
    fullName: Joi.string().required(),
    roleId: Joi.string().uuid().required(),
  });
  return signUpSchema.validate(signUp);
};

export const validateLoginDto = (login: any) => {
  const loginSchema = Joi.object({
    fullName: Joi.string().required(),
    code: Joi.string().min(4).required(),
  });
  return loginSchema.validate(login);
};

export const validateRoleDto = (roleDto: any) => {
  const roleSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
  })
  return roleSchema.validate(roleDto);
}

export const validateUpdateDto = (updateDto: any) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    status: Joi.string().valid(...validStatuses).required(),
  });

  const { error, value } = schema.validate(updateDto, { abortEarly: false });

  if (error) {
    throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
  }

  return value;
};

export const validateProjectDto = (ProjectDto: any) => {
  const projectSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    fields: Joi.array().min(1).max(100).required(),
    team_leader: Joi.string().required(),
    description: Joi.string().min(10).max(500).required(),
    logo: Joi.string().required(),
    cover_image: Joi.string().required(),
    link: Joi.string().required()
  });

  return projectSchema.validate(ProjectDto, { abortEarly: false });
}

export const validateRatingDto = (data: any) => {
  const schema = Joi.object({
      userId: Joi.string().uuid().required(),
      projectId: Joi.string().uuid().required(),
      relevance: Joi.number().integer().min(1).max(10).required(),
      impact_to_society: Joi.number().integer().min(1).max(10).required(),
      performance: Joi.number().integer().min(1).max(10).required(),
      progress: Joi.number().integer().min(1).max(10).required(),
      feedback: Joi.string().max(500).optional()
  });

  return schema.validate(data);
};