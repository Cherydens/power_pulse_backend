const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

/**
 * Schema for the ExercisesFilter model.
 */
const exercisesFilterSchema = new Schema(
  {
    filter: {
      type: String,
    },
    name: {
      type: String,
    },
    imgURL: {
      type: String,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
exercisesFilterSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'exercisefilters' collection using the userSchema.
 */
const ExercisesFilter = model('exercisefilter', exercisesFilterSchema);

module.exports = ExercisesFilter;
