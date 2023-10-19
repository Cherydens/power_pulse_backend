const { HttpError } = require('../utils');

/**
 * Middleware function to validate the request body using a schema.
 *
 * @param {Joi.Schema} schema - Joi schema for request body validation
 * @returns {function} Middleware function to validate the request body
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    // Validate the request body using the provided schema
    const { error } = schema.validate(req.body);

    // If validation fails, send a 400 Bad Request response with the validation error message
    if (error) {
      next(new HttpError(400, error.details[0].message));
    }

    // Continue with the next middleware or route handler if validation succeeds
    next();
  };
};

module.exports = validateBody;
