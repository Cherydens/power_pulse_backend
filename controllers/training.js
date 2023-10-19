const Exercises = require("../models/exercises");
const { controllerWrapper } = require("../utils");

const getAllExercises = controllerWrapper(async (req, res) => {
  const result = await Exercises.find();
  res.status(200).json(result);
});
const getExerciseFilter = controllerWrapper(async (req, res) => {
  const muscules = await Exercises.distinct("target");
  const bodyPart = await Exercises.distinct("bodyPart");
  const equipment = await Exercises.distinct("equipment");

  const result = { muscules, bodyPart, equipment };

  res.status(200).json(result);
});

module.exports = {
  getAllExercises,
  getExerciseFilter,
};
