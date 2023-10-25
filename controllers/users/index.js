const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const getCurrentUser = require('./getCurrentUser');
const logoutUser = require('./logoutUser');
const updateUserParams = require('./updateUserParams');
const getUserParams = require('./getUserParams');
const updateUserName = require('./updateUserName');
const updateUserAvatar = require('./updateUserAvatar');
const googleAuth = require('./googleAuth');

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUserParams,
  getUserParams,
  updateUserName,
  updateUserAvatar,
  googleAuth,
};
