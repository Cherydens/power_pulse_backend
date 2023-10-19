// The necessary modules and libraries are imported:

const express = require('express');
const { authenticate } = require('../../middlewares');
const controllers = require('../../controllers/products');

// An Express router object is created:
const router = express.Router();

// Тренування
// Routes for handling various user-related requests are added to this router. Here's their description:

// Створити приватний ендпоінт, який повертає всі існуючі в базі даних (БД) категорії продуктів.

// Route for get all products (get /exercises):
router.get('/', authenticate, controllers.getAllProducts);

// Створити приватний ендпоінт, який повертає авторизованому користувачу усі продукти, допустимі за типом його крові до вживання або навпаки заборонені.

// Route for get products categories (get /):
router.get('/categories', authenticate, controllers.getProductsCategories);

module.exports = router;
