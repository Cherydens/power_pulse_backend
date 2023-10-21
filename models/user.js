const { Schema, model } = require('mongoose');

const { handleMongooseError, getAge } = require('../utils');
const { regexpList } = require('../variables');

/**
 * Schema for the AvatarUrls model.
 */
const avatarUrlsSchema = new Schema(
  {
    mobile: {
      type: String,
    },
    desktop: {
      type: String,
    },
  },
  { versionKey: false, _id: false }
);

/**
 * Schema for the UserParams model.
 */
const userParamsSchema = new Schema(
  {
    height: {
      type: Number,
      min: 150,
    },
    currentWeight: {
      type: Number,
      min: 35,
    },
    desiredWeight: {
      type: Number,
      min: 35,
    },
    birthday: {
      type: Date,
      validate: {
        validator: function (birthday) {
          return getAge(birthday) >= 18;
        },
        message: 'User must be 18 years or older. ',
      },
    },
    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
    },
    levelActivity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { versionKey: false, _id: false }
);

/**
 * Schema for the User model.
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [regexpList.email, 'Email must be valid'],
      unique: [true, 'Email in use'],
    },
    password: {
      type: String,
      minLength: [6, 'Password min length 6 characters'],
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: '',
    },
    avatarUrls: { type: avatarUrlsSchema, default: {} },
    userParams: { type: userParamsSchema, default: {} },
  },
  { versionKey: false, minimize: false, timestamps: true }
);

// Handle Mongoose save errors using a post middleware
userSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'user' collection using the userSchema.
 */
const User = model('user', userSchema);

module.exports = User;
