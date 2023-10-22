const Joi = require('joi');

const { validateErrorMessageList } = require('../../variables');

/**
 * Joi schema for validating the request body when product add in diary.
 */
const productSchema = Joi.object({
  // date: Joi.string().pattern('dd/mm/YYYY').required(),
  // date: Joi.date().format('DD/MM/YYYY'),
  date: Joi.string().required(),
  amount: Joi.number().required(),
  calories: Joi.number().required(),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when exercise add in diary.
 */
const exerciseSchema = Joi.object({
  // date: Joi.string().pattern('dd/mm/YYYY').required(),
  // date: Joi.date().format('DD/MM/YYYY'),
  date: Joi.string().required(),
  time: Joi.number().required(),
  calories: Joi.number().required(),
}).messages(validateErrorMessageList);

module.exports = {
  productSchema,
  exerciseSchema,
};
