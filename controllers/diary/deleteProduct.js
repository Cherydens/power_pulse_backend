const Products = require('../../models/productsInDiary');
const { controllerWrapper } = require('../../utils/index');

// Контролер видалення продукту що містяться в щоденнику користувача за визначену дату
const deleteProduct = controllerWrapper(async (req, res) => {
  const { productId } = req.params;

  const result = await Products.findByIdAndRemove(productId);
  //  Response with the object of exercises
  res.status(202).json(result);
});

module.exports = deleteProduct;
