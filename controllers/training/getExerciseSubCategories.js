const ExerciseSubCategories = require('../../models/exerciseSubCategories');
const { controllerWrapper } = require('../../utils');

const getExerciseSubCategories = controllerWrapper(async (req, res) => {
  const { filter = '' } = req.query;

  switch (filter) {
    case 'bodyPart':
      const bodyPart = await ExerciseSubCategories.find({
        filter: 'Body parts',
      });
      res.status(200).json(bodyPart);
      break;
    case 'target':
      const muscles = await ExerciseSubCategories.find({
        filter: 'Muscles',
      });
      res.status(200).json(muscles);
      break;
    case 'equipment':
      const equipment = await ExerciseSubCategories.find({
        filter: 'Equipment',
      });
      res.status(200).json(equipment);
      break;

    default:
      const result = await ExerciseSubCategories.find();
      res.status(200).json(result);
  }
});

module.exports = getExerciseSubCategories;
