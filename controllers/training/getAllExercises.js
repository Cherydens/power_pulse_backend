const Exercises = require('../../models/exercises');
const { controllerWrapper } = require('../../utils');

const getAllExercises = controllerWrapper(async (req, res) => {
  const result = await Exercises.find();

  res.status(200).json(result);
});

module.exports = getAllExercises;
