const User = require('../../models/user');
const { controllerWrapper, getBmr } = require('../../utils');

const getUserParams = controllerWrapper(async (req, res) => {
  const { email } = req.user;
  const { name, userParams, avatarUrls, createdAt } = await User.findOne({
    email,
  });

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
