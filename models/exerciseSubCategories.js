const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

const exerciseSubCategoriesSchema = new Schema(
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

exerciseSubCategoriesSchema.post('save', handleMongooseError);

const ExerciseSubCategories = model(
  'exercisesubcategory',
  exerciseSubCategoriesSchema
);

module.exports = ExerciseSubCategories;
