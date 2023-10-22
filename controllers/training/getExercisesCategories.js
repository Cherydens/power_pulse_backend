const ExerciseCategories = require('../../models/exerciseCategories');
const { controllerWrapper } = require('../../utils');

const getExerciseCategories = controllerWrapper(async (req, res) => {
  const result = await ExerciseCategories.find();

  res.status(200).json(result);
});

module.exports = getExerciseCategories;
