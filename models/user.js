const { Schema, model } = require('mongoose');

const { handleMongooseError, getAge } = require('../utils');
const { regexpList, userParamsList } = require('../variables');

/**
 * Schema for the AvatarUrls model.
 */
const avatarUrlsSchema = new Schema(
  {
    avatar_37x37: {
      type: String,
    },
    avatar_46x46: {
      type: String,
    },
    avatar_74x74: {
      type: String,
    },
    avatar_90x90: {
      type: String,
    },
    avatar_92x92: {
      type: String,
    },
    avatar_150x150: {
      type: String,
    },
    avatar_180x180: {
      type: String,
    },
    avatar_300x300: {
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
      min: userParamsList.minHeight,
    },
    currentWeight: {
      type: Number,
      min: userParamsList.minCurrentWeight,
    },
    desiredWeight: {
      type: Number,
      min: userParamsList.minDesiredWeight,
    },
    birthday: {
      type: Date,
      validate: {
        validator: function (birthday) {
          return getAge(birthday) >= userParamsList.minAge;
        },
        message: `User must be ${userParamsList.minAge} years or older.`,
      },
    },
    blood: {
      type: Number,
      enum: userParamsList.bloodTypes,
    },
    sex: {
      type: String,
      enum: userParamsList.sexTypes,
    },
    levelActivity: {
      type: Number,
      enum: userParamsList.levelActivityTypes,
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
      minLength: [
        userParamsList.passwordMinLength,
        `Password min length ${userParamsList.passwordMinLength} characters`,
      ],
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: '',
    },
    avatarUrls: { type: avatarUrlsSchema, default: null },
    userParams: { type: userParamsSchema, default: null },
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
