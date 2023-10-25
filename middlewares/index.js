const validateBody = require('./validateBody');
const authenticate = require('./authenticate');
const uploadImage = require('./uploadImage.js');
const passport = require('./google-authenticate');

module.exports = {
  validateBody,
  authenticate,
  uploadImage,
  passport,
};
