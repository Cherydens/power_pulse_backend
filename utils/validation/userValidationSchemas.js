const Joi = require('joi');

const { regexpList, validateErrorMessageList } = require('../../variables');
const getAge = require('../aboutUser/getAge');

/**
 * Joi schema for validating the request body when registering a new user.
 */
const registerUserSchema = Joi.object({
  name: Joi.string().trim().empty().required(),
  email: Joi.string().trim().empty().pattern(regexpList.email).required(),
  password: Joi.string().min(6).required(),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when logging in a user.
 */
const loginUserSchema = Joi.object({
  email: Joi.string().trim().empty().pattern(regexpList.email).required(),
  password: Joi.string().min(6).required(),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating in a userParams.
 */
const updateUserParamsSchema = Joi.object({
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  birthday: Joi.date()
    .max('now')
    .custom((value, helpers) => {
      if (getAge(value) < 18) {
        return helpers.error('date.min', { limit: '18 years' });
      }
      return value;
    })
    .required(),
  blood: Joi.number().valid(1, 2, 3, 4).required(),
  sex: Joi.string().valid('male', 'female').required(),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required(),
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
