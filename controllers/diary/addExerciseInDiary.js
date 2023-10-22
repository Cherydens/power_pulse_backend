const Exercises = require('../../models/exercisesInDiary');
const { controllerWrapper } = require('../../utils/index');

// Контролер додавання вправи що містяться в щоденнику користувача за визначену дату
const addExerciseInDiary = controllerWrapper(async (req, res) => {
  const exercise = await Exercises.create({ ...req.body });

  res.status(201).json(exercise);
});

module.exports = {
  addExerciseInDiary,
};