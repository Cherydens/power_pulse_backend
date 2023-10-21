const ExercisesFilter = require('../../models/exerciseCategories');
const { controllerWrapper } = require('../../utils');

const getExerciseCategories = controllerWrapper(async (req, res) => {
  // await for filters from db
  const result = await ExercisesFilter.find();

  //  Response with the object  of exercise filters
  res.status(200).json(result);
});

module.exports = getExerciseCategories;
