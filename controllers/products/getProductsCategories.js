const { ProductsCategories } = require('../../models');
const { controllerWrapper } = require('../../utils');

const getProductsCategories = controllerWrapper(async (req, res) => {
  const result = await ProductsCategories.find();

  res.status(200).json(result);
});

module.exports = getProductsCategories;
