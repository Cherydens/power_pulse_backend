const Products = require('../models/products');
const Exercises = require('../models/exercises');
const { controllerWrapper } = require('../utils/wrappers/controllerWrapper');

const getDayDashboard = controllerWrapper(async (req, res) => {
  const productResult = await Products.find();
  const exercisestResult = await Exercises.find();
  const result = { productResult, exercisestResult };
  //  Response with the object of exercises
  res.status(200).json(result);
});

module.exports = {
  getDayDashboard,
};
