const { ExercisesDiary, Exercises, User } = require('../../models');
const { controllerWrapper } = require('../../utils');

const getStatistic = controllerWrapper(async (req, res) => {
  const exerciseTotalQuantity = await Exercises.countDocuments();
  const allDiaryExercises = await ExercisesDiary.find();
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
