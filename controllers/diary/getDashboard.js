const Products = require('../../models/productsInDiary');
const Exercises = require('../../models/exercisesInDiary');
const { controllerWrapper } = require('../../utils/wrappers/controllerWrapper');

// Контролер отримання всіх вправ та продуктів що містяться в щоденнику користувача
const getDashboard = controllerWrapper(async (req, res) => {
  const productResult = await Products.find();
  const exercisestResult = await Exercises.find();
  const result = { productResult, exercisestResult };
  //  Response with the object of exercises
  res.status(200).json(result);
});

module.exports = {
  getDashboard,
};
