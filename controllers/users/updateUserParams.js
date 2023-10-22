const User = require('../../models/user');
const { getBmr, controllerWrapper } = require('../../utils');

const updateUserParams = controllerWrapper(async (req, res) => {
  const { _id, name, email, avatarUrls, createdAt } = req.user;
  const userParams = { ...req.body };

  await User.findByIdAndUpdate(_id, { userParams });

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

module.exports = updateUserParams;
