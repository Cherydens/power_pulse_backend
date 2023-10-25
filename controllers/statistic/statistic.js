const Exercises = require('../../models/exercises');
const User = require('../../models/user');
const DiaryExercises = require('../../models/exercisesInDiary');
const { controllerWrapper, HttpError } = require('../../utils');

const getStatistic = controllerWrapper(async (req, res) => {
  const exerciseTotalCounter = await Exercises.find();
  console.log(exerciseTotalCounter.length - 1);
});

module.exports = {
  getStatistic,
};
