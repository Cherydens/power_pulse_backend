const Exercises = require('../../models/exercises');
const User = require('../../models/user');
const DiaryExercises = require('../../models/exercisesInDiary');

const { controllerWrapper } = require('../../utils');

const getStatistic = controllerWrapper(async (req, res) => {
  const exerciseTotalQuantity = await Exercises.countDocuments();
  const allDiaryExercises = await DiaryExercises.find();
  const usersTotalQuantity = await User.countDocuments();

  const caloriesTotalQuantity = allDiaryExercises.reduce((acc, exercise) => {
    return acc + exercise.calories;
  }, 0);

  const minutesTotalQuantity = allDiaryExercises.reduce((acc, exercise) => {
    return acc + exercise.time;
  }, 0);

  const exerciseDoneTotalQuantity = allDiaryExercises.length;

  const result = {
    exerciseTotalQuantity,
    caloriesTotalQuantity,
    usersTotalQuantity,
    minutesTotalQuantity,
    exerciseDoneTotalQuantity,
  };

  res.status(200).json(result);
});

module.exports = {
  getStatistic,
};
