const Joi = require('joi');

const {
  validateErrorMessageList,
  userParamsList,
  authValidateList,
} = require('../../variables');
const getAge = require('../aboutUser/getAge');

/**
 * Joi schema for validating the request body when registering a new user.
 */
const registerUserSchema = Joi.object({
  name: Joi.string().trim().empty().required(),
  email: Joi.string()
    .trim()
    .empty()
    .email()
    .pattern(authValidateList.emailRegExp)
    .required(),
  password: Joi.string()
    .min(authValidateList.passwordMinLength)
    .max(authValidateList.passwordMaxLength)
    .pattern(authValidateList.passwordRegExp)
    .required()
    .messages({
      'string.pattern.base':
        'Password must be 8-32 characters long and include at least one digit, one lowercase letter, one uppercase letter and one special character',
    }),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when logging in a user.
 */
const loginUserSchema = Joi.object({
  email: registerUserSchema.extract('email'),
  password: registerUserSchema.extract('password'),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating in a userParams.
 */
const updateUserParamsSchema = Joi.object({
  height: Joi.number().min(userParamsList.minHeight).required(),
  currentWeight: Joi.number().min(userParamsList.minCurrentWeight).required(),
  desiredWeight: Joi.number().min(userParamsList.minDesiredWeight).required(),
  birthday: Joi.date()
    .max('now')
    .custom((value, helpers) => {
      if (getAge(value) < userParamsList.minAge) {
        return helpers.error('date.min', { limit: userParamsList.minAge });
      }
      return value;
    })
    .required(),
  blood: Joi.number()
    .valid(...userParamsList.bloodTypes)
    .required(),
  sex: Joi.string()
    .valid(...userParamsList.sexTypes)
    .required(),
  levelActivity: Joi.number()
    .valid(...userParamsList.levelActivityTypes)
    .required(),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating in a userName.
 */
const updateUserNameSchema = Joi.object({
  name: registerUserSchema.extract('name'),
}).messages(validateErrorMessageList);

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserParamsSchema,
  updateUserNameSchema,
};
