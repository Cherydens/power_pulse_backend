/**
 * Multer middleware configuration for uploading images.
 */
const multer = require('multer');
const path = require('path');

const { HttpError } = require('../utils');
const { fileTypes, dirNames } = require('../variables');

// Define the temporary directory path
const TEMP_DIR = path.join(__dirname, '..', dirNames.TEMP_DIR);

// Configure Multer storage settings
const multerConfig = multer.diskStorage({
  destination: TEMP_DIR,
  filename: (req, file, cb) => {
    // Use the original filename for the uploaded file
    cb(null, file.originalname);
  },
});

// Create a Multer middleware instance for image uploads
const uploadImage = multer({
  storage: multerConfig,
  limits: { fileSize: 2000000 }, // Limit file size to 2MB
  fileFilter: (req, file, cb) => {
    // Check if the uploaded file is an image based on its MIME type
    if (file.mimetype.includes(fileTypes.IMAGE)) {
      cb(null, true); // Accept the file
      return;
    }
    // Reject the file with a 400 Bad Request error if it's not an image
    cb(new HttpError(400, `File type must be an ${fileTypes.IMAGE}`), false);
  },
});

module.exports = uploadImage;
