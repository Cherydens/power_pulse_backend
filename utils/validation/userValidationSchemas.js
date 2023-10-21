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
  height: Joi.number().min(150).required().messages({
    'number.min': 'Height must be at least 150 cm.',
    'any.required': 'Height is required.',
    'number.base': 'Height must be a valid number.',
  }),
  currentWeight: Joi.number().min(35).required().messages({
    'number.min': 'Current weight must be at least 35 kg.',
    'any.required': 'Current weight is required.',
    'number.base': 'Current weight must be a valid number.',
  }),
  desiredWeight: Joi.number().min(35).required().messages({
    'number.min': 'Desired weight must be at least 35 kg.',
    'any.required': 'Desired weight is required.',
    'number.base': 'Desired weight must be a valid number.',
  }),
  birthday: Joi.date()
    .max('now')
    .custom((value, helpers) => {
      if (getAge(value) < 18) {
        return helpers.error('date.min', { limit: '18 years' });
      }
      return value;
    }, 'Minimum age validation')
    .required()
    .messages({
      'date.max': 'Birthday cannot be in the future.',
      'date.base': 'Birthday must be a valid date.',
      'any.required': 'Birthday is required.',
    }),
  blood: Joi.number().valid(1, 2, 3, 4).required().messages({
    'number.base': 'Blood type must be a valid number.',
    'any.only': 'Invalid blood type selected.',
    'any.required': 'Blood type is required.',
  }),
  sex: Joi.string().valid('male', 'female').required().messages({
    'string.base': 'Sex must be a valid string.',
    'any.only': 'Invalid sex selected.',
    'any.required': 'Sex is required.',
  }),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required().messages({
    'number.base': 'Activity level must be a valid number.',
    'any.only': 'Invalid activity level selected.',
    'any.required': 'Activity level is required.',
  }),
});

/**
 * Joi schema for validating the request body when updating in a userName.
 */
const updateUserName = Joi.object({
  name: Joi.string().trim().empty().required().messages({
    'string.empty': 'Name cannot be empty.',
    'any.required': 'Name is required.',
  }),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserParamsSchema,
  updateUserName,
};
