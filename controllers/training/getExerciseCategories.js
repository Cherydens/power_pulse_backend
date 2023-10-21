const ExerciseCategories = require('../../models/exerciseCategories');
const { controllerWrapper } = require('../../utils');

const getExerciseCategories = controllerWrapper(async (req, res) => {
  const bodyPart = await ExerciseCategories.find({
    filter: 'Body parts',
  });
  const muscles = await ExerciseCategories.find({
    filter: 'Muscles',
  });
  const equipment = await ExerciseCategories.find({
    filter: 'Equipment',
  });

  const result = { bodyPart, muscles, equipment };

  res.status(200).json(result);
});

module.exports = getExerciseCategories;
