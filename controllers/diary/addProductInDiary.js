const Products = require('../../models/productsInDiary');
const { controllerWrapper } = require('../../utils/index');

// Контролер додавання продукту що містяться в щоденнику користувача за визначену дату
const addProductInDiary = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const product = await Products.create({ ...req.body, owner });

  res.status(201).json(product);
});

module.exports = addProductInDiary;
