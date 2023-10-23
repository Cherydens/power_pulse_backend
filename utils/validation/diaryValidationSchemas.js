const Joi = require('joi');

const { validateErrorMessageList } = require('../../variables');

/**
 * Joi schema for validating the request body when product add in diary.
 */
const productSchema = Joi.object({
  product_ID: Joi.string().required(),
  date: Joi.date().max('now').required(),
  amount: Joi.number().required(),
  calories: Joi.number().required(),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when exercise add in diary.
 */
const exerciseSchema = Joi.object({
  exercise_ID: Joi.string().required(),
  date: Joi.date().max('now').required(),
  time: Joi.number().required(),
  calories: Joi.number().required(),
}).messages(validateErrorMessageList);

module.exports = {
  productSchema,
  exerciseSchema,
};
