const { ProductsDiary } = require('../../models');
const { controllerWrapper, HttpError } = require('../../utils/index');

// Контролер видалення продукту що містяться в щоденнику користувача за визначену дату
const deleteProduct = controllerWrapper(async (req, res) => {
  const { productId: _id } = req.params;
  const { _id: owner } = req.user;

  const productResult = await ProductsDiary.findOneAndRemove({
    _id,
    owner,
  });

  if (!productResult) {
    throw new HttpError(404);
  }

  res.status(200).json(productResult);
});

module.exports = deleteProduct;
