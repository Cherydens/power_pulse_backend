const Exercises = require('../../models/exercises');
const { controllerWrapper } = require('../../utils');

const getAllExercises = controllerWrapper(async (req, res) => {
  const {
    bodyPart = null,
    equipment = null,
    target = null,
    page = 1,
    limit = 18,
  } = req.query;
  const skip = (page - 1) * limit;

  const baseQuery = {};

  if (bodyPart) {
    baseQuery.bodyPart = { $regex: bodyPart, $options: 'i' };
  }

  if (equipment) {
    baseQuery.equipment = { $regex: equipment, $options: 'i' };
  }

  if (target) {
    baseQuery.target = { $regex: target, $options: 'i' };
  }

  const data = await Exercises.find(baseQuery).skip(skip).limit(limit);

  const total = await Exercises.countDocuments(baseQuery);

  res.status(200).json({ data, page: +page, limit: +limit, total });
});

module.exports = getAllExercises;
