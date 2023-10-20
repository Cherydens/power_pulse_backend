// The necessary modules and libraries are imported:

const express = require('express');
const { authenticate } = require('../../middlewares');
const controllers = require('../../controllers/training/index');

// An Express router object is created:
const router = express.Router();

// Тренування
// Routes for handling various user-related requests are added to this router. Here's their description:

// Створити приватний ендпоінт, який повертає всі існуючі в базі даних (БД) тренування.

// Route for get all exercises (get /exercises):
router.get('/exercises', authenticate, controllers.getAllExercises);

// Створити приватний ендпоінт, який повертає всі типи існуючих в базі даних (БД) частин тілу, мʼязів та обладнання.

// Route for get exercise filter (get /filter):
router.get('/filter', authenticate, controllers.getExerciseFilter);

module.exports = router;
