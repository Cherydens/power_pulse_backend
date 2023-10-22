const { controllerWrapper } = require('../../utils');

const getCurrentUser = controllerWrapper(async (req, res) => {
  const { name, email, avatarUrls, createdAt } = req.user;

  res.status(200).json({
    user: {
      name,
      email,
      avatarUrls,
      createdAt,
    },
  });
});

module.exports = getCurrentUser;
