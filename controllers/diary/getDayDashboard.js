const Products = require('../../models/productsInDiary');
const Exercises = require('../../models/exercisesInDiary');
const { controllerWrapper } = require('../../utils/index');

// Контролер отримання вправ та продуктів що містяться в щоденнику користувача за визначену дату
const getDayDashboard = controllerWrapper(async (req, res) => {
  const { date } = req.query;
  const productResult = await Products.find({ date: date });
  const exercisestResult = await Exercises.find({ date: date });
  const result = { productResult, exercisestResult };
  //  Response with the object of exercises
  res.status(200).json(result);
});

module.exports = getDayDashboard;
