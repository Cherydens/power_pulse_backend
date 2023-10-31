const { Exercises } = require('../../models');
const { controllerWrapper } = require('../../utils');

const getExerciseById = controllerWrapper(async (req, res) => {
  const { exerciseId } = req.params;

  const result = await Exercises.findById(exerciseId);

  res.status(200).json(result);
});

module.exports = getExerciseById;
