const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const User = require('../models/user');

const {
  HttpError,
  controllerWrapper,
  imageResizer,
  sendEmail,
  createVerificationEmail,
} = require('../utils');

const { dirNames } = require('../variables');

const { SECRET_KEY } = process.env;

/**
 * Registers a new user with the provided email and password.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 409 if email is already in use
 * @returns {Object} JSON response containing the newly registered user's email and subscription
 */
const registerUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  // Check if the email is already in use
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  // Hash the provided password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create random verification token
  const verificationToken = nanoid();

  // Create a new user with the hashed password
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  // Send verification email
  await sendEmail(createVerificationEmail({ email, verificationToken }));

  // Respond with the newly registered user's email and subscription
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
});

/**
 * Verify new user's email with the provided verification token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 404 if user with verification token not found
 * @returns {Object} JSON response containing the message 'Verification successful'
 */
const verifyUserEmail = controllerWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({ message: 'Verification successful' });
});

/**
 * Resend Email to the User with a Verification Link.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 404 if user with verification email not found
 * @throws {HttpError} 400 if verification has already been passed
 * @returns {Object} JSON response containing the message 'Verification email sent'
 */
const resendVerifyUserEmail = controllerWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(404, 'Email not found');
  }
  if (user.verify) {
    throw new HttpError(400, 'Verification has already been passed');
  }

  const { verificationToken } = user;

  await sendEmail(createVerificationEmail({ email, verificationToken }));

  res.status(200).json({ message: 'Verification email sent' });
});

/**
 * Logs in a user with the provided email and password.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 401 if email or password is wrong
 * @returns {Object} JSON response containing an authentication token and user data
 */
const loginUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // If the user doesn't exist, respond with a 401 error
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  // If user's email is not verified, respond with a 401 error
  if (!user.verify) {
    throw new HttpError(401, 'Email is not verified');
  }

  // Compare the provided password with the hashed password in the database
  const passwordCompare = await bcrypt.compare(password, user.password);

  // If the passwords don't match, respond with a 401 error
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  // Create a JWT payload with the user's ID
  const payload = {
    id: user._id,
  };

  // Sign the payload with the secret key and set an expiration time
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  // Update the user's token in the database
  await User.findByIdAndUpdate(user._id, { token });

  // Respond with the authentication token and user data
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
});

/**
 * Logs out the currently authenticated user by removing their token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response indicating successful logout
 */
const logoutUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;

  // Remove the user's token by setting it to null
  await User.findByIdAndUpdate(_id, { token: null });

  // Respond with a success message
  res.status(204).json({ message: 'No content' });
});

/**
 * Retrieves the information of the currently authenticated user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the user's email and subscription
 */
const getCurrentUser = controllerWrapper(async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  // Respond with the user's email and subscription
  res.status(200).json({ email, subscription, avatarURL });
});

/**
 * Updates the subscription of the currently authenticated user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the updated user data
 */
const updateSubscriptionUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  // Update the user's subscription and retrieve the updated user data
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  // Respond with the updated user data
  res.status(200).json(result);
});

/**
 * Updates the avatar of the currently authenticated user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the updated user avatarURL
 */
const updateUserAvatar = controllerWrapper(async (req, res) => {
  // Check if an avatar file is provided in the request
  if (!req.file) {
    throw new HttpError(400, 'Avatar file is required');
  }

  // Extract necessary data from the uploaded file
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;

  // Generate a unique filename for the user's avatar
  const filename = `${_id}_${originalname}`;

  // Define the destination path for the uploaded avatar
  const resultUpload = path.join(
    __dirname,
    '..',
    dirNames.PUBLIC_DIR,
    dirNames.AVATARS_DIR,
    filename
  );

  // Construct the avatarURL for the user
  const avatarURL = path.join(dirNames.AVATARS_DIR, filename);

  // Resize the uploaded image
  await imageResizer(tempUpload);

  // Move the uploaded file to its final destination
  await fs.rename(tempUpload, resultUpload);

  // Update the user's avatarURL in the database
  await User.findByIdAndUpdate(_id, { avatarURL });

  // Respond with the updated user avatarURL
  res.json({
    avatarURL,
  });
});

module.exports = {
  registerUser,
  verifyUserEmail,
  resendVerifyUserEmail,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscriptionUser,
  updateUserAvatar,
};
