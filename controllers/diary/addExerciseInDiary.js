const Exercises = require('../../models/exercisesInDiary');
const { controllerWrapper } = require('../../utils/index');

// Контролер додавання вправи що містяться в щоденнику користувача за визначену дату
const addExerciseInDiary = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const exercise = await Exercises.create({ ...req.body, owner });

  res.status(201).json({
    exercise_ID: exercise.exercise_ID,
    date: exercise.date,
    time: exercise.time,
    calories: exercise.calories,
    _id: exercise._id,
  });
});

module.exports = addExerciseInDiary;
