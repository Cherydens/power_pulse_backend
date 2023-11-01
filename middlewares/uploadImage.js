const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { _id } = req.user;

    return {
      folder: 'power_pulse_avatars',
      allowed_formats: ['jpg', 'png', 'svg', 'webp', 'heic', 'jpeg'],
      public_id: `avatar_${_id}_${Date.now()}`,
      transformation: [
        { width: 450, height: 450, gravity: 'auto', crop: 'fill' },
      ],
    };
  },
});

const uploadImage = multer({ storage });

module.exports = uploadImage;
