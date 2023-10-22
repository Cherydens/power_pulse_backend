const ExerciseSubCategories = require('../../models/exerciseSubCategories');
const { controllerWrapper } = require('../../utils');

const getExerciseSubCategories = controllerWrapper(async (req, res) => {
  const bodyPart = await ExerciseSubCategories.find({
    filter: 'Body parts',
  });
  const muscles = await ExerciseSubCategories.find({
    filter: 'Muscles',
  });
  const equipment = await ExerciseSubCategories.find({
    filter: 'Equipment',
  });

  const result = { bodyPart, muscles, equipment };

  res.status(200).json(result);
});

module.exports = getExerciseSubCategories;
