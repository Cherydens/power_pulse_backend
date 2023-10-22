const Products = require('../../models/products');
const Exercises = require('../../models/exercises');
const { controllerWrapper } = require('../../utils/wrappers/controllerWrapper');

// Контролер отримання вправ та продуктів що містяться в щоденнику користувача за визначену дату
const getDayDashboard = controllerWrapper(async (req, res) => {
  const { date } = req.query;
  const productResult = await Products.find({ dateOfuse: date });
  const exercisestResult = await Exercises.find({ dateOfdone: date });
  const result = { productResult, exercisestResult };
  //  Response with the object of exercises
  res.status(200).json(result);
});

module.exports = {
  getDayDashboard,
};
