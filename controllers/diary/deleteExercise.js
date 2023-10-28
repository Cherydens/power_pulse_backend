const Exercises = require('../../models/exercisesInDiary');
const { controllerWrapper, HttpError } = require('../../utils/index');

// Контролер видалення вправи що містяться в щоденнику користувача за визначену дату
const deleteExercise = controllerWrapper(async (req, res) => {
  const { exerciseId } = req.params;
  const { _id } = req.user;

  const exerciseResult = await Exercises.find({ exerciseId, owner: _id });
  if (exerciseResult.length === 0) {
    throw new HttpError(404, 'Not found');
  }

  const result = await Exercises.findByIdAndRemove(exerciseId);
  //  Response with the object of exercises
  res.status(202).json(result);
});

module.exports = deleteExercise;
