const { controllerWrapper, getBmr } = require('../../utils');

const getUserParams = controllerWrapper(async (req, res) => {
  const { email, name, userParams, avatarUrls, createdAt } = req.user;

  res.status(200).json({
    user: {
      name,
      email,
      avatarUrls,
      userParams,
      createdAt,
    },
    bmr: getBmr(userParams),
  });
});

module.exports = getUserParams;
