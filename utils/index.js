const HttpError = require('./errors/HttpError');
const controllerWrapper = require('./wrappers/controllerWrapper');
const handleMongooseError = require('./errors/handleMongooseError');
const userValidationSchemas = require('./validation/userValidationSchemas');
const reviewValidationSchemas = require('./validation/reviewValidationSchemas');
const getAge = require('./aboutUser/getAge');
const getBmr = require('./aboutUser/getBmr');

module.exports = {
  HttpError,
  controllerWrapper,
  handleMongooseError,
  userValidationSchemas,
  reviewValidationSchemas,
  getAge,
  getBmr,
};
