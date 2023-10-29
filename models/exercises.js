const { Schema, model, isObjectIdOrHexString } = require('mongoose');

const { handleMongooseError } = require('../utils');
const { string } = require('joi');

const exercisesSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
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
