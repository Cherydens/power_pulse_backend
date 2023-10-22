const HttpError = require('./errors/HttpError');
const controllerWrapper = require('./wrappers/controllerWrapper');
const handleMongooseError = require('./errors/handleMongooseError');
const userValidationSchemas = require('./validation/userValidationSchemas');
const diaryValidationSchemas = require('./validation/diaryValidationSchemas');
const createFolderIsNotExist = require('./fileStructure/createFolderIsNotExist');
const getAge = require('./aboutUser/getAge');
const getBmr = require('./aboutUser/getBmr');
const cloudinaryUpload = require('./imageHandlers/cloudinaryUpload');

module.exports = {
  HttpError,
  controllerWrapper,
  handleMongooseError,
  userValidationSchemas,
  diaryValidationSchemas,
  createFolderIsNotExist,
  getAge,
  getBmr,
  cloudinaryUpload,
};
