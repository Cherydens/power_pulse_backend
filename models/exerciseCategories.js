const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

const exerciseCategoriesSchema = new Schema(
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

exerciseCategoriesSchema.post('save', handleMongooseError);

const ExerciseCategories = model('exercisecategory', exerciseCategoriesSchema);

module.exports = ExerciseCategories;
