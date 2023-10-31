const { format } = require('date-fns');
const { controllerWrapper } = require('../../utils/index');
const { ProductsDiary, ExercisesDiary } = require('../../models');

// Контролер отримання вправ та продуктів що містяться в щоденнику користувача за визначену дату
const getDayDashboard = controllerWrapper(async (req, res) => {
  const { date = null } = req.query;
  const { _id: owner } = req.user;

  const baseQuery = { owner };
  date && (baseQuery.date = format(new Date(date), 'yyyy-MM-dd'));

  const productDay = await ProductsDiary.find(baseQuery).populate(
    'product_ID',
    'title category groupBloodNotAllowed'
  );

  const exerciseDay = await ExercisesDiary.find(baseQuery).populate(
    'exercise_ID',
    'bodyPart equipment target name'
  );

  const productResult = productDay.map(
    ({ _id, product_ID, date, amount, calories }) => ({
      _id,
      product_ID: product_ID._id,
      date,
      amount,
      calories,
      title: product_ID.title,
      category: product_ID.category,
      groupBloodNotAllowed: product_ID.groupBloodNotAllowed,
    })
  );

  const exerciseResult = exerciseDay.map(
    ({ _id, exercise_ID, date, time, calories }) => ({
      _id,
      exercise_ID: exercise_ID._id,
      date,
      time,
      calories,
      bodyPart: exercise_ID.bodyPart,
      equipment: exercise_ID.equipment,
      target: exercise_ID.target,
      name: exercise_ID.name,
    })
  );

  const result = { productResult, exerciseResult };

  //  Response with the object of exercises
  res.status(200).json(result);
});

module.exports = getDayDashboard;
