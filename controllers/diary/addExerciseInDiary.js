const Exercises = require('../../models/exercises');
const { controllerWrapper } = require('../../utils/wrappers/controllerWrapper');

// Контролер додавання вправи що містяться в щоденнику користувача за визначену дату
const addExerciseInDiary = controllerWrapper(async (req, res) => {
  const exercise = await Exercises.create({ ...req.body });

  res.status(201).json(exercise);
});

module.exports = {
  addExerciseInDiary,
};
