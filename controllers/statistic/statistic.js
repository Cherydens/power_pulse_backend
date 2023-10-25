const Exercises = require('../../models/exercises');
const User = require('../../models/user');
const DiaryExercises = require('../../models/exercisesInDiary');

const { controllerWrapper } = require('../../utils');

const getStatistic = controllerWrapper(async (req, res) => {
  const allExercises = await Exercises.find();
  const allDiaryExercises = await DiaryExercises.find();
  const allUsers = await User.find();

  const exerciseTotalQuantity = allExercises.length;

  const caloriesTotalQuantity = allDiaryExercises.reduce((acc, exercise) => {
    return acc + exercise.calories;
  }, 0);

  const timeTotalQuantity = allDiaryExercises.reduce((acc, exercise) => {
    return acc + exercise.time;
  }, 0);

  const usersTotalQuantity = allUsers.length;

  const exerciseDoneTotalQuantity = allDiaryExercises.length;

  const result = {
    exerciseTotalQuantity,
    caloriesTotalQuantity,
    usersTotalQuantity,
    timeTotalQuantity,
    exerciseDoneTotalQuantity,
  };

  res.status(200).json(result);
});

module.exports = {
  getStatistic,
};
