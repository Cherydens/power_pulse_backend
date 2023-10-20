const Products = require('../../models/products');
const ProductsCategories = require('../../models/productsCategories');
const { controllerWrapper } = require('../../utils');

/**
 * Get all products from database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @returns {Object} JSON response containing the products.
 */

const getAllProducts = controllerWrapper(async (req, res) => {
  // take a query params for find product by keyword

  const { q = '' } = req.query;

  // await for products array from db
  const result = await Products.find({
    title: { $regex: q, $options: 'i' },
  });

  //  Response with the object of products
  res.status(200).json(result);
});

/**
 * Get products categories from database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @returns {Object} JSON response containing the products categories
 */

const getProductsCategories = controllerWrapper(async (req, res) => {
  // await for products categories array from db
  const result = await ProductsCategories.find();

  //  Response with the object  of products categories
  res.status(200).json(result);
});

module.exports = {
  getAllProducts,
  getProductsCategories,
};
