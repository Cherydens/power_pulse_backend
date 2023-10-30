const express = require('express');
const { authenticate } = require('../../middlewares');
const controllers = require('../../controllers/products/index');

const router = express.Router();

// Route for getting all products (GET /):
router.route('/').get(authenticate, controllers.getAllProducts);

// Route for getting all products categories (GET /categories):
router
  .route('/categories')
  .get(authenticate, controllers.getProductsCategories);

module.exports = router;
