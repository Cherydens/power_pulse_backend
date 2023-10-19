const Joi = require('joi');

const { validateErrorMessageList, regexpList } = require('../../variables');

/**
 * Joi schema for validating the request body when registering a new user.
 */
const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexpList.email).required(),
  password: Joi.string().min(6).required(),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when verifying user's email.
 */
const verifyUserEmailSchema = Joi.object({
  email: registerUserSchema.extract('email'),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when logging in a user.
 */
const loginUserSchema = Joi.object({
  email: registerUserSchema.extract('email'),
  password: registerUserSchema.extract('password'),
}).messages(validateErrorMessageList);

module.exports = {
  registerUserSchema,
  verifyUserEmailSchema,
  loginUserSchema,
};
