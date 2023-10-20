const Products = require('../models/products');
const Exercises = require('../models/exercises');
const { controllerWrapper } = require('../utils/wrappers/controllerWrapper');

const getDashboard = controllerWrapper(async (req, res) => {
  const productResult = await Products.find();
  const exercisestResult = await Exercises.find();
  const result = { productResult, exercisestResult };
  //  Response with the object of exercises
  res.status(200).json(result);
});

const getDayDashboard = controllerWrapper(async (req, res) => {
  const { date } = req.query;
  const productResult = await Products.find({ dateOfuse: date });
  const exercisestResult = await Exercises.find({ dateOfdone: date });
  const result = { productResult, exercisestResult };
  //  Response with the object of exercises
  res.status(200).json(result);
});

module.exports = {
  getDashboard,
  getDayDashboard,
};
