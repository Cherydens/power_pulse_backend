const Exercises = require("../models/exercises");
const { controllerWrapper } = require("../utils");

/**
 * Get all exercises from database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @returns {Object} JSON response containing the exercises.
 */

const getAllExercises = controllerWrapper(async (req, res) => {
  // await for exercises array from db
  const result = await Exercises.find();

  //  Response with the object of exercises
  res.status(200).json(result);
});

/**
 * Get exercise filters from database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @returns {Object} JSON response containing the exercise filters
 */

const getExerciseFilter = controllerWrapper(async (req, res) => {
  // await for target array from db
  const muscules = await Exercises.distinct("target");

  // await for bodyPart array from db
  const bodyPart = await Exercises.distinct("bodyPart");

  // await for equipment array from db
  const equipment = await Exercises.distinct("equipment");

  // create one response object with 3 type of fields
  const result = { muscules, bodyPart, equipment };

  //  Response with the object  of exercise filters
  res.status(200).json(result);
});

module.exports = {
  getAllExercises,
  getExerciseFilter,
};
