const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const {
  addExerciseInDiary,
  addProductInDiary,
  deleteExercise,
  deleteProduct,
  getDayDashboard,
} = require('../../controllers/diary/index');

const diaryValidationSchemas = require('../../utils/validation/diaryValidationSchemas');

// An Express router object is created:
const router = express.Router();

router.get('/day', authenticate, getDayDashboard);

router.delete('/day/diaryProducts/:productId', authenticate, deleteProduct);

router.delete('/day/diaryExercises/:exerciseId', authenticate, deleteExercise);

router.post(
  '/day/diaryProducts',
  authenticate,
  validateBody(diaryValidationSchemas.productSchema),
  addProductInDiary
);

router.post(
  '/day/diaryExercises',
  authenticate,
  validateBody(diaryValidationSchemas.exerciseSchema),
  addExerciseInDiary
);

module.exports = router;
