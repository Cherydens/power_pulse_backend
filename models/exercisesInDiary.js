const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

/**
 * Schema for the User model.
 */
const exercisesSchema = new Schema(
  {
    exercise: {
      type: String,
      required: [true, 'Title is required'],
    },
    date: {
      type: String,
      default: '',
      required: true,
    },
    time: {
      type: Number,
      default: null,
      required: true,
    },
    calories: {
      type: Number,
      default: null,
      required: true,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
exercisesSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'exercise' collection using the userSchema.
 */
const Exercises = model('exerciseDiary', exercisesSchema);

module.exports = Exercises;
