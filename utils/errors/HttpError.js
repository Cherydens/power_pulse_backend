const { httpErrorMessageList } = require('../../variables');

/**
 * Custom HTTP error class that extends the JavaScript Error class.
 */
class HttpError extends Error {
  /**
   * Create a new HttpError instance.
   *
   * @param {number} status - HTTP status code for the error
   * @param {string} message - Optional error message
   */
  constructor(
    status = 500,
    message = httpErrorMessageList[status] || httpErrorMessageList.default
  ) {
    super(message);

    // Set the HTTP status code and error name
    this.status = status;
    this.name = 'HttpError';
  }
}

module.exports = HttpError;
