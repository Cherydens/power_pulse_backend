const Products = require('../../models/productsInDiary');
const { format } = require('date-fns');
const { controllerWrapper } = require('../../utils/index');

// Контролер додавання продукту що містяться в щоденнику користувача за визначену дату
const addProductInDiary = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  req.body.date = format(new Date(req.body.date), 'yyyy-MM-dd');
  const product = await Products.create({ ...req.body, owner });

  res.status(201).json({
    product_ID: product.product_ID,
    date: product.date,
    amount: product.amount,
    calories: product.calories,
    _id: product._id,
  });
});

module.exports = addProductInDiary;
