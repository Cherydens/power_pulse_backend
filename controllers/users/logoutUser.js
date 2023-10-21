const User = require('../../models/user');
const { controllerWrapper } = require('../../utils');

const logoutUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({
    message: 'No content',
  });
});

module.exports = logoutUser;
