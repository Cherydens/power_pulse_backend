/**
 * Middleware function to wrap asynchronous controller functions for error handling.
 *
 * @param {function} controller - Asynchronous controller function to be wrapped
 * @returns {function} Middleware function that wraps the controller
 */
const controllerWrapper = controller => {
  return async (req, res, next) => {
    try {
      // Call the provided controller function and handle any errors
      await controller(req, res, next);
    } catch (error) {
      // Pass any caught errors to the next middleware for error handling
      next(error);
    }
  };
};

module.exports = controllerWrapper;
