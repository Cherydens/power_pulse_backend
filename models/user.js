const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');
const { regexpList } = require('../variables');

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
      match: [regexpList.email, 'Email must be valid'],
      required: [true, 'Email is required'],
      unique: [true, 'Email in use'],
    },
    password: {
      type: String,
      minlength: [6, 'Password min length 6 characters'],
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
userSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'user' collection using the userSchema.
 */
const User = model('user', userSchema);

module.exports = User;
