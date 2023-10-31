const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');

/**
 * Schema for the User model.
 */
const exerciseDiarySchema = new Schema(
  {
    exercise_ID: {
      type: Schema.Types.String,
      ref: 'exercise',
      required: [true, 'ID is required'],
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
exerciseDiarySchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'exercise' collection using the userSchema.
 */
const ExercisesDiary = model('exerciseDiary', exerciseDiarySchema);

module.exports = ExercisesDiary;
