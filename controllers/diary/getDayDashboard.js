const { format } = require('date-fns');
const { controllerWrapper } = require('../../utils/index');
const {
  ProductsDiary,
  ExercisesDiary,
  Products,
  Exercises,
} = require('../../models');

// Контролер отримання вправ та продуктів що містяться в щоденнику користувача за визначену дату
const getDayDashboard = controllerWrapper(async (req, res) => {
  const { date = null } = req.query;
  const { _id: owner } = req.user;

  const baseQuery = { owner };

  if (date) {
    baseQuery.date = format(new Date(date), 'yyyy-MM-dd');
  }

  const productDay = await ProductsDiary.find(baseQuery).lean();
  const exerciseDay = await ExercisesDiary.find(baseQuery).lean();

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
