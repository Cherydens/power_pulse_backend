const User = require('../../models/user');
const {
  controllerWrapper,
  cloudinaryUpload,
  HttpError,
} = require('../../utils');

const updateUserAvatar = controllerWrapper(async (req, res) => {
  if (!req.file) {
    throw new HttpError(400, 'Avatar file is required');
  }
  const { name, email, _id, userParams, createdAt } = req.user;

  const { path } = req.file;

  const avatarUrls = await cloudinaryUpload({ path, _id });

  await User.findByIdAndUpdate(_id, { avatarUrls });

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

module.exports = updateUserAvatar;
