const Exercises = require('../../models/exercises');
const ExercisesFilter = require('../../models/exercisesFilter');
const { controllerWrapper } = require('../../utils');

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
  // await for filters from db
  const result = await ExercisesFilter.find();

  //  Response with the object  of exercise filters
  res.status(200).json(result);
});

module.exports = {
  getAllExercises,
  getExerciseFilter,
};
