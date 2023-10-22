const { controllerWrapper } = require('../../utils');

const getCurrentUser = controllerWrapper(async (req, res) => {
  const { name, email, avatarUrls, userParams, createdAt } = req.user;

  res.status(200).json({
    user: {
      name,
      email,
      avatarUrls,
      userParams,
      createdAt,
    },
  });
});

module.exports = getCurrentUser;
