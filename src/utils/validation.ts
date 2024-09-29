import Joi from "joi";

export const ValidateSignUpDto = (signUp: any) => {
  const signUpSchema = Joi.object({
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    username: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
  });
  return signUpSchema.validate(signUp);
};

export const validateLoginDto = (login: any) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  return loginSchema.validate(login);
};

export const validateUpdateDto = (updateDto: any) => {
  const updateSchema = Joi.object({
    fullName: Joi.string(),
    phoneNumber: Joi.string(),
    username: Joi.string(),
  });
  return updateSchema.validate(updateDto);
};

export const validateRoleDto = (roleDto: any) => {
  const roleSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
  })
  return roleSchema.validate(roleDto);
}