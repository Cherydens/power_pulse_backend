const User = require('../../models/user');
const { controllerWrapper, HttpError } = require('../../utils');

const updateUserAvatar = controllerWrapper(async (req, res) => {
  if (!req.file) {
    throw new HttpError(400, 'Avatar file is required');
  }

  const { filename, mimetype, originalname } = req.file;

  if (!mimetype.includes('image')) {
    throw new HttpError(400, 'File type must be an image');
  }

  const fileExt = originalname.split('.').pop();
  const { _id } = req.user;

  const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload`;
  const fullFileName = `${filename}.${fileExt}`;

  const avatarUrls = {
    avatar_37x37: `${cloudinaryUrl}/h_37,w_37/${fullFileName}`,
    avatar_46x46: `${cloudinaryUrl}/h_46,w_46/${fullFileName}`,
    avatar_74x74: `${cloudinaryUrl}/h_74,w_74/${fullFileName}`,
    avatar_90x90: `${cloudinaryUrl}/h_90,w_90/${fullFileName}`,
    avatar_92x92: `${cloudinaryUrl}/h_92,w_92/${fullFileName}`,
    avatar_150x150: `${cloudinaryUrl}/h_150,w_150/${fullFileName}`,
    avatar_180x180: `${cloudinaryUrl}/h_180,w_180/${fullFileName}`,
    avatar_300x300: `${cloudinaryUrl}/h_300,w_300/${fullFileName}`,
  };

  await User.findByIdAndUpdate(_id, { avatarUrls });

  res.status(200).json({
    user: {
      avatarUrls,
    },
  });
});

module.exports = updateUserAvatar;
