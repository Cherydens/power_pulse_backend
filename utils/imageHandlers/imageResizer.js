const Jimp = require('jimp');

/**
 * The function reads an image from the provided path, auto-crops it, resizes it to a size of 250x250 pixels while centering the content, and then writes the resized and cropped image back to the same path.
 *
 * @param {string} tempImage - The path to the temporary image file to be resized and cropped.
 * @returns {Promise<void>} A promise that resolves once the image has been resized and cropped.
 */
const imageResizer = async (tempImage) => {
  // Read the image from the provided path
  const image = await Jimp.read(tempImage);
  await image
    .autocrop() // Auto crop the image
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE) // Cover the image to a size of 250x250 pixels, centering the content
    .writeAsync(tempImage); // Write the resized and cropped image back to the same path
};

module.exports = imageResizer;
