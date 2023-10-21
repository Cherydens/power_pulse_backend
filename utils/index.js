const HttpError = require('./errors/HttpError');
const controllerWrapper = require('./wrappers/controllerWrapper');
const handleMongooseError = require('./errors/handleMongooseError');
const userValidationSchemas = require('./validation/userValidationSchemas');
const createFolderIsNotExist = require('./fileStructure/createFolderIsNotExist');
const imageResizer = require('./imageHandlers/imageResizer');
const getAge = require('./aboutUser/getAge');
const getBmr = require('./aboutUser/getBmr');

module.exports = {
  HttpError,
  controllerWrapper,
  handleMongooseError,
  userValidationSchemas,
  createFolderIsNotExist,
  imageResizer,
  getAge,
  getBmr,
};
