const Products = require('../models/products');
const Exercises = require('../models/exercises');
const { controllerWrapper } = require('../utils/wrappers/controllerWrapper');

// Контролер отримання всіх вправ та продуктів що містяться в щоденнику користувача
const getDashboard = controllerWrapper(async (req, res) => {
  const productResult = await Products.find();
  const exercisestResult = await Exercises.find();
  const result = { productResult, exercisestResult };
  //  Response with the object of exercises
  res.status(200).json(result);
});

// Контролер отримання вправ та продуктів що містяться в щоденнику користувача за визначену дату
const getDayDashboard = controllerWrapper(async (req, res) => {
  const { date } = req.query;
  const productResult = await Products.find({ dateOfuse: date });
  const exercisestResult = await Exercises.find({ dateOfdone: date });
  const result = { productResult, exercisestResult };
  //  Response with the object of exercises
  res.status(200).json(result);
});

// Контролер видалення вправи що містяться в щоденнику користувача за визначену дату
const deleteExercise = controllerWrapper(async (req, res) => {
  const { exercisId } = req.params;
  const result = await Exercises.findByIdAndRemove(exercisId);
  //  Response with the object of exercises
  res.status(202).json(result);
});

// Контролер видалення продукту що містяться в щоденнику користувача за визначену дату
const deleteProduct = controllerWrapper(async (req, res) => {
  const { productId } = req.params;
  const result = await Exercises.findByIdAndRemove(productId);
  //  Response with the object of exercises
  res.status(202).json(result);
});

module.exports = {
  getDashboard,
  getDayDashboard,
  deleteExercise,
  deleteProduct,
};
