const Joi = require('joi');

const {
  regexpList,
  validateErrorMessageList,
  userParamsList,
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
    .pattern(regexpList.email)
    .required(),
  password: Joi.string().min(userParamsList.passwordMinLength).required(),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when logging in a user.
 */
const loginUserSchema = Joi.object({
  email: Joi.string()
    .trim()
    .empty()
    .email()
    .pattern(regexpList.email)
    .required(),
  password: Joi.string().min(userParamsList.passwordMinLength).required(),
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
  name: Joi.string().trim().empty().required(),
}).messages(validateErrorMessageList);

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserParamsSchema,
  updateUserNameSchema,
};
