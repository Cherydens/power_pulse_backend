const Exercises = require('../../models/exercisesInDiary');
const { controllerWrapper } = require('../../utils/index');

// Контролер видалення вправи що містяться в щоденнику користувача за визначену дату
const deleteExercise = controllerWrapper(async (req, res) => {
  const { exerciseId } = req.params;
  console.log('BEBEBEBBE');
  const result = await Exercises.findByIdAndRemove(exerciseId);
  //  Response with the object of exercises
  res.status(202).json(result);
});

module.exports = {
  deleteExercise,
};
