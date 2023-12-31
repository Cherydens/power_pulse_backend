const { ExercisesDiary } = require('../../models');
const { controllerWrapper, HttpError } = require('../../utils/index');

// Контролер видалення вправи що містяться в щоденнику користувача за визначену дату
const deleteExercise = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { id: _id } = req.params;

  const exerciseResult = await ExercisesDiary.findOneAndRemove({
    _id,
    owner,
  });

  if (!exerciseResult) {
    throw new HttpError(404);
  }

  res.status(200).json(exerciseResult);
});

module.exports = deleteExercise;
