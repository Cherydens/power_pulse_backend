const { format } = require('date-fns');
const { controllerWrapper } = require('../../utils/index');
const { ProductsDiary } = require('../../models');

// Контролер додавання продукту що містяться в щоденнику користувача за визначену дату
const addProductInDiary = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  req.body.date = format(new Date(req.body.date), 'yyyy-MM-dd');

  const { product_ID, date, amount, calories, _id } =
    await ProductsDiary.create({
      ...req.body,
      owner,
    });

  res.status(201).json({
    product_ID,
    date,
    amount,
    calories,
    _id,
  });
});

module.exports = addProductInDiary;
