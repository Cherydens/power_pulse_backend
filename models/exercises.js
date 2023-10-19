const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

/**
 * Schema for the User model.
 */
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

// Handle Mongoose save errors using a post middleware
exercisesSchema.post("save", handleMongooseError);

/**
 * Mongoose model for the 'exercise' collection using the userSchema.
 */
const Exercises = model("exercise", exercisesSchema);

module.exports = Exercises;
