/**
 * Middleware function to handle Mongoose database errors.
 *
 * @param {Error} error - The Mongoose error
 * @param {Object} data - Additional data related to the error (not used in this example)
 * @param {function} next - Next function to pass control to the next middleware
 */
const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  // Determine the HTTP status code based on the Mongoose error type and code
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;

  // Continue with the next middleware or route handler
  next();
};

module.exports = handleMongooseError;
