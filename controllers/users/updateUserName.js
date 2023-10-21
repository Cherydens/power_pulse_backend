const User = require('../../models/user');
const { controllerWrapper } = require('../../utils');

const updateUserName = controllerWrapper(async (req, res) => {
  const { email } = req.user;
  const { name, avatarUrls, userParams, createdAt } =
    await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

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

module.exports = updateUserName;
