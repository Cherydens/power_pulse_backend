const { ExerciseSubCategories } = require('../../models');
const { controllerWrapper } = require('../../utils');
const { exerciseSubCategoriesFiltersList } = require('../../variables');

const getExerciseSubCategories = controllerWrapper(async (req, res) => {
  const { filter = null } = req.query;
  const baseQuery = {};

  if (filter && exerciseSubCategoriesFiltersList[filter]) {
    baseQuery.filter = exerciseSubCategoriesFiltersList[filter];
  }

  const result = await ExerciseSubCategories.find(baseQuery);

  res.status(200).json(result);
});

module.exports = getExerciseSubCategories;
