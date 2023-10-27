const Products = require('../../models/productsInDiary');
const { controllerWrapper, HttpError } = require('../../utils/index');

// Контролер видалення продукту що містяться в щоденнику користувача за визначену дату
const deleteProduct = controllerWrapper(async (req, res) => {
  const { productId } = req.params;
  const { _id } = req.user;

  const productResult = await Products.find({ productId, owner: _id });
  if (productResult.length === 0) {
    throw new HttpError(404, 'Not found');
  }

  const result = await Products.findByIdAndRemove(productId);

  res.status(202).json(result);
});

module.exports = deleteProduct;
