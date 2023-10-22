const Products = require('../../models/productsInDiary');
const { controllerWrapper } = require('../../utils/wrappers/controllerWrapper');

// Контролер додавання продукту що містяться в щоденнику користувача за визначену дату
const addProductInDiary = controllerWrapper(async (req, res) => {
  const product = await Products.create({ ...req.body });

  res.status(201).json(product);
});

module.exports = {
  addProductInDiary,
};
