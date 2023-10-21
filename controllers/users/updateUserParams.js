const User = require('../../models/user');
const { getBmr, controllerWrapper } = require('../../utils');

const updateUserParams = controllerWrapper(async (req, res) => {
  const { email } = req.user;
  const userParams = { ...req.body };

  const { name, avatarUrls, createdAt } = await User.findOneAndUpdate(
    { email },
    { userParams: userParams },
    { new: true }
  );

  res.status(200).json({
    user: {
      name,
      email,
      avatarUrls,
      userParams: userParams,
      createdAt,
    },
    bmr: getBmr(req.body),
  });
});

module.exports = updateUserParams;
