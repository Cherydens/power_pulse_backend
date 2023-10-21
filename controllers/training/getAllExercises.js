const Exercises = require('../../models/exercises');
const { controllerWrapper } = require('../../utils');

const getAllExercises = controllerWrapper(async (req, res) => {
  const {
    bodyPart = '',
    equipment = '',
    target = '',
    page = 1,
    limit = 18,
  } = req.query;
  const skip = (page - 1) * limit;

  const result = await Exercises.find(
    {
      bodyPart: { $regex: bodyPart, $options: 'i' },
      equipment: { $regex: equipment, $options: 'i' },
      target: { $regex: target, $options: 'i' },
    },
    {},
    { skip, limit }
  );

  res.status(200).json(result);
});

module.exports = getAllExercises;
