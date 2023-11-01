const User = require('../../models/user');
const { controllerWrapper, HttpError } = require('../../utils');

const updateUserAvatar = controllerWrapper(async (req, res) => {
  if (!req.file) {
    throw new HttpError(400, 'Avatar file is required');
  }

  const { filename, mimetype } = req.file;

  if (!mimetype.includes('image')) {
    throw new HttpError(400, 'File type must be an image');
  }

  const { _id } = req.user;

  const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload`;

  const avatarUrls = {
    avatar_37x37: `${cloudinaryUrl}/h_37,w_37/${filename}`,
    avatar_46x46: `${cloudinaryUrl}/h_46,w_46/${filename}`,
    avatar_74x74: `${cloudinaryUrl}/h_74,w_74/${filename}`,
    avatar_90x90: `${cloudinaryUrl}/h_90,w_90/${filename}`,
    avatar_92x92: `${cloudinaryUrl}/h_92,w_92/${filename}`,
    avatar_140x140: `${cloudinaryUrl}/h_140,w_140/${filename}`,
    avatar_150x150: `${cloudinaryUrl}/h_150,w_150/${filename}`,
    avatar_180x180: `${cloudinaryUrl}/h_180,w_180/${filename}`,
    avatar_250x250: `${cloudinaryUrl}/h_250,w_250/${filename}`,
    avatar_300x300: `${cloudinaryUrl}/h_300,w_300/${filename}`,
    avatar_350x350: `${cloudinaryUrl}/h_350,w_350/${filename}`,
    avatar_450x450: `${cloudinaryUrl}/h_450,w_450/${filename}`,
  };

  await User.findByIdAndUpdate(_id, { avatarUrls });

  res.status(200).json({
    user: {
      avatarUrls,
    },
  });
});

module.exports = updateUserAvatar;
