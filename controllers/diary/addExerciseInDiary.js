const { format } = require('date-fns');
const { controllerWrapper } = require('../../utils/index');
const { ExercisesDiary } = require('../../models');

// Контролер додавання вправи що містяться в щоденнику користувача за визначену дату
const addExerciseInDiary = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  req.body.date = format(new Date(req.body.date), 'yyyy-MM-dd');

  const { exercise_ID, date, time, calories, _id } =
    await ExercisesDiary.create({
      ...req.body,
      owner,
    });

  res.status(201).json({
    exercise_ID,
    date,
    time,
    calories,
    _id,
  });
});

module.exports = addExerciseInDiary;
