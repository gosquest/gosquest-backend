import Joi from "joi";
import { StatusEnum } from "../constants";

export const ValidateSignUpDto = (signUp: any) => {
  const signUpSchema = Joi.object({
    fullName: Joi.string().required(),
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

const validStatuses = Object.values(StatusEnum);

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
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Name must be a string.',
        'string.empty': 'Name is required.',
        'string.min': 'Name should have a minimum length of 3.',
        'string.max': 'Name should have a maximum length of 100.'
      }),
    field: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Field is required.',
        'string.min': 'Field should have a minimum length of 3.',
        'string.max': 'Field should have a maximum length of 100.'
      }),
    team_leader: Joi.string().required().messages({
        'string.empty': 'Team leader is required.'
      }),
    description: Joi.string().min(10).max(500).required().messages({
        'string.empty': 'Description is required.',
        'string.min': 'Description should have a minimum length of 10.',
        'string.max': 'Description should have a maximum length of 500.'
      }),
    logo: Joi.string().required().messages({
        'string.empty': 'Logo is required'
      }),
    cover_image: Joi.string().required().messages({
        'string.empty': 'Cover image is required'
      }),
    link: Joi.string().required().messages({
        'string.empty': 'Link or email or contact is required.'
      }),
  });

  return projectSchema.validate(ProjectDto, { abortEarly: false });
}