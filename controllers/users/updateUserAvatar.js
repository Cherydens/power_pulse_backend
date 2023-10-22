const User = require('../../models/user');
const { controllerWrapper, HttpError } = require('../../utils');

const updateUserAvatar = controllerWrapper(async (req, res) => {
  if (!req.file) {
    throw new HttpError(400, 'Avatar file is required');
  }
  const { filename, mimetype, originalname } = req.file;
  const fileExt = originalname.split('.').pop();

  if (!mimetype.includes('image')) {
    throw new HttpError(400, 'File type must be an image');
  }

  const { name, email, _id, userParams, createdAt } = req.user;

  const CLOUDINARY_URL = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload`;

  const avatarUrls = {
    avatar_37x37: `${CLOUDINARY_URL}/h_37,w_37/${filename}.${fileExt}`,
    avatar_46x46: `${CLOUDINARY_URL}/h_46,w_46/${filename}.${fileExt}`,
    avatar_90x90: `${CLOUDINARY_URL}/h_90,w_90/${filename}.${fileExt}`,
    avatar_150x150: `${CLOUDINARY_URL}/h_150,w_150/${filename}.${fileExt}`,
    avatar_180x180: `${CLOUDINARY_URL}/h_180,w_180/${filename}.${fileExt}`,
    avatar_300x300: `${CLOUDINARY_URL}/h_300,w_300/${filename}.${fileExt}`,
  };

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
