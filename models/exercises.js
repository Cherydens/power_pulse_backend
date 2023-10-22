const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

const exercisesSchema = new Schema(
  {
    bodyPart: {
      type: String,
    },
    equipment: {
      type: String,
    },
    gifUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    target: {
      type: String,
    },
    burnedCalories: {
      type: Number,
    },
    time: {
      type: Number,
    },
  },
  { versionKey: false }
);

exercisesSchema.post('save', handleMongooseError);

const Exercises = model('exercise', exercisesSchema);

module.exports = Exercises;
