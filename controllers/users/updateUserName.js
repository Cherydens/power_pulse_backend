const User = require('../../models/user');
const { controllerWrapper } = require('../../utils');

const updateUserName = controllerWrapper(async (req, res) => {
  const { _id, email, avatarUrls, userParams, createdAt } = req.user;
  const { name } = await User.findByIdAndUpdate(_id, req.body, {
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
