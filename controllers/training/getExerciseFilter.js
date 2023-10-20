const ExercisesFilter = require('../../models/exercisesFilter');
const { controllerWrapper } = require('../../utils');

const getExerciseFilter = controllerWrapper(async (req, res) => {
  // await for filters from db
  const result = await ExercisesFilter.find();

  //  Response with the object  of exercise filters
  res.status(200).json(result);
});

module.exports = getExerciseFilter;
