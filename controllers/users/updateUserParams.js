const User = require('../../models/user');
const { getBmr, controllerWrapper } = require('../../utils');

const updateUserParams = controllerWrapper(async (req, res) => {
  const { email } = req.user;

  const { name, avatarUrls, createdAt } = await User.findOneAndUpdate(
    { email },
    req.body,
    { new: true }
  );

  res.status(200).json({
    user: {
      name,
      email,
      avatarUrls,
      userParams: req.body,
      createdAt,
    },
    bmr: getBmr(req.body),
  });
});

module.exports = updateUserParams;
