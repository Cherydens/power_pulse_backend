const User = require('../../models/user');
const { controllerWrapper } = require('../../utils');

const updateUserName = controllerWrapper(async (req, res) => {
  const { _id, email, avatarUrls, userParams, createdAt } = req.user;
  const { name } = req.body;
  await User.findByIdAndUpdate(_id, { name });

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
