const Joi = require('joi');

const {
  validateErrorMessageList,
  reviewParamsList,
} = require('../../variables');

/**
 * Joi schema for validating the request body when adding a review.
 */
const addReviewSchema = Joi.object({
  rating: Joi.number()
    .valid(...reviewParamsList.rating)
    .required(),
  description: Joi.string()
    .trim()
    .max(reviewParamsList.descriptionMaxCharacters),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating a review.
 */
const updateReviewSchema = Joi.object({
  rating: addReviewSchema.extract('rating').optional(),
  description: addReviewSchema.extract('description'),
}).messages(validateErrorMessageList);

module.exports = {
  addReviewSchema,
  updateReviewSchema,
};
