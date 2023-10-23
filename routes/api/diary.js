// The necessary modules and libraries are imported:

const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { getDayDashboard } = require('../../controllers/diary/getDayDashboard');
const { deleteExercise } = require('../../controllers/diary/deleteExercise');
const { deleteProduct } = require('../../controllers/diary/deleteProduct');
const {
  addProductInDiary,
} = require('../../controllers/diary/addProductInDiary');
const {
  addExerciseInDiary,
} = require('../../controllers/diary/addExerciseInDiary');

const diaryValidationSchemas = require('../../utils/validation/diaryValidationSchemas');

// An Express router object is created:
const router = express.Router();

router.get('/day', authenticate, getDayDashboard);

router.delete('/day/diaryProducts/:productId', authenticate, deleteProduct);

router.delete('/day/diaryExercises/:exerciseId', authenticate, deleteExercise);

router.post(
  '/day/diaryProduct',
  authenticate,
  validateBody(diaryValidationSchemas.productSchema),
  addProductInDiary
);

router.post(
  '/day/diaryExercise',
  authenticate,
  validateBody(diaryValidationSchemas.exerciseSchema),
  addExerciseInDiary
);

module.exports = router;
