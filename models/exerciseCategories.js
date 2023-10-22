const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

const exerciseCategoriesSchema = new Schema(
  {
    title: {
      type: String,
    },
  },
  { versionKey: false, _id: false }
);

exerciseCategoriesSchema.post('save', handleMongooseError);

const ExerciseCategories = model('exercisecategory', exerciseCategoriesSchema);

module.exports = ExerciseCategories;
