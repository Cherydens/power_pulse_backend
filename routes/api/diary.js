// The necessary modules and libraries are imported:

const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { getDashboard } = require('../../controllers/diary/getDashboard');
const { getDayDashboard } = require('../../controllers/diary/getDayDashboard');
const { deleteExercise } = require('../../controllers/diary/deleteExercise');
const { deleteProduct } = require('../../controllers/diary/deleteProduct');
const {
  addProductInDiary,
} = require('../../controllers/diary/addProductInDiary');
const {
  addExerciseInDiary,
} = require('../../controllers/diary/addExerciseInDiary');

const { exerciseSchema, productSchema } = require('../../utils');

// An Express router object is created:
const router = express.Router();

router.get('/', authenticate, getDashboard);

router.get('/day', authenticate, getDayDashboard);

router.delete('/day:exerciseId', authenticate, deleteExercise);

router.delete('/day:productId', authenticate, deleteProduct);

router.post(
  '/day',
  authenticate,
  validateBody(productSchema),
  addProductInDiary
);

router.post(
  '/day',
  authenticate,
  validateBody(exerciseSchema),
  addExerciseInDiary
);

module.exports = router;
