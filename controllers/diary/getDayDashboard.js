const ProductsDiary = require('../../models/productsInDiary');
const ExercisesDiary = require('../../models/exercisesInDiary');
const Exercises = require('../../models/exercises');
const Products = require('../../models/products');
const { controllerWrapper } = require('../../utils/index');

// Контролер отримання вправ та продуктів що містяться в щоденнику користувача за визначену дату
const getDayDashboard = controllerWrapper(async (req, res) => {
  const { date } = req.query;
  const { _id } = req.user;
  const productDay = await ProductsDiary.find({
    date: date,
    owner: _id,
  }).lean();
  const exerciseDay = await ExercisesDiary.find({
    date: date,
    owner: _id,
  }).lean();

  const [productResult, exerciseResult] = await Promise.all([
    Promise.all(
      productDay.map(async product => {
        const { title, category, groupBloodNotAllowed } =
          await Products.findById(product.product_ID).lean();
        return { ...product, title, category, groupBloodNotAllowed };
      })
    ),
    Promise.all(
      exerciseDay.map(async exercise => {
        const { bodyPart, equipment, target, name } = await Exercises.findById(
          exercise.exercise_ID
        ).lean();

        return { ...exercise, bodyPart, equipment, target, name };
      })
    ),
  ]);

  const result = { productResult, exerciseResult };

  //  Response with the object of exercises
  res.status(200).json(result);
});

module.exports = getDayDashboard;
