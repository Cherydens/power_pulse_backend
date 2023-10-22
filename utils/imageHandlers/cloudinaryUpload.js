const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUpload = async ({ path, _id }) => {
  const resultAvatar_37x37 = await cloudinary.uploader.upload(path, {
    folder: 'power_pulse_avatars',
    public_id: `avatar_37x37_${_id}`,
    transformation: [{ width: 37, height: 37, gravity: 'auto', crop: 'fill' }],
  });

  const resultAvatar_46x46 = await cloudinary.uploader.upload(path, {
    folder: 'power_pulse_avatars',
    public_id: `avatar_46x46_${_id}`,
    transformation: [{ width: 46, height: 46, gravity: 'auto', crop: 'fill' }],
  });

  const resultAvatar_90x90 = await cloudinary.uploader.upload(path, {
    folder: 'power_pulse_avatars',
    public_id: `avatar_90x90_${_id}`,
    transformation: [{ width: 90, height: 90, gravity: 'auto', crop: 'fill' }],
  });

  const resultAvatar_150x150 = await cloudinary.uploader.upload(path, {
    folder: 'power_pulse_avatars',
    public_id: `avatar_150x150_${_id}`,
    transformation: [
      { width: 150, height: 150, gravity: 'auto', crop: 'fill' },
    ],
  });

  const resultAvatar_180x180 = await cloudinary.uploader.upload(path, {
    folder: 'power_pulse_avatars',
    public_id: `avatar_180x180_${_id}`,
    transformation: [
      { width: 180, height: 180, gravity: 'auto', crop: 'fill' },
    ],
  });

  const resultAvatar_300x300 = await cloudinary.uploader.upload(path, {
    folder: 'power_pulse_avatars',
    public_id: `avatar_300x300_${_id}`,
    transformation: [
      { width: 300, height: 300, gravity: 'auto', crop: 'fill' },
    ],
  });

  await fs.unlink(path);

  return {
    avatar_37x37: resultAvatar_37x37.url,
    avatar_46x46: resultAvatar_46x46.url,
    avatar_90x90: resultAvatar_90x90.url,
    avatar_150x150: resultAvatar_150x150.url,
    avatar_180x180: resultAvatar_180x180.url,
    avatar_300x300: resultAvatar_300x300.url,
  };
};

module.exports = cloudinaryUpload;
