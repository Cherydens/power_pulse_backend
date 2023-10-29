const Products = require('../../models/products');
const { controllerWrapper } = require('../../utils');

const getProductById = controllerWrapper(async (req, res) => {
  const { productId } = req.params;

  const result = await Products.findById(productId);

  res.status(200).json(result);
});

module.exports = getProductById;
