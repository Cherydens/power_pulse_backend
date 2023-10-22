const Exercises = require('../../models/exercisesInDiary');
const { controllerWrapper } = require('../../utils/wrappers/controllerWrapper');

// Контролер видалення вправи що містяться в щоденнику користувача за визначену дату
const deleteExercise = controllerWrapper(async (req, res) => {
  const { exercisId } = req.params;
  const result = await Exercises.findByIdAndRemove(exercisId);
  //  Response with the object of exercises
  res.status(202).json(result);
});

module.exports = {
  deleteExercise,
};
