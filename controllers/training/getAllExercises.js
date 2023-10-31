const { Exercises } = require('../../models');
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
  bodyPart && (baseQuery.bodyPart = { $regex: bodyPart.trim(), $options: 'i' });
  equipment &&
    (baseQuery.equipment = { $regex: equipment.trim(), $options: 'i' });
  target && (baseQuery.target = { $regex: target.trim(), $options: 'i' });

  const data = await Exercises.find(baseQuery).skip(skip).limit(limit);

  const total = await Exercises.countDocuments(baseQuery);

  res.status(200).json({ data, page: +page, limit: +limit, total });
});

module.exports = getAllExercises;
