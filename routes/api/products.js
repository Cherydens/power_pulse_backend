const express = require('express');
const { authenticate } = require('../../middlewares');
const controllers = require('../../controllers/products/index');

const router = express.Router();

router.get('/', authenticate, controllers.getAllProducts);

router.get('/categories', authenticate, controllers.getProductsCategories);

module.exports = router;
