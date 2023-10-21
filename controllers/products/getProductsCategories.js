const ProductsCategories = require('../../models/productsCategories');
const { controllerWrapper } = require('../../utils');

const getProductsCategories = controllerWrapper(async (req, res) => {
  const result = await ProductsCategories.find();

  res.status(200).json(result);
});

module.exports = getProductsCategories;
