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

const router = express.Router();

// Route for getting user's exercises and products by date (GET /current):
router.route('/day').get(authenticate, getDayDashboard);

router
  .route('/day/diaryProducts/:productId')
  .delete(authenticate, deleteProduct);

router
  .route('/day/diaryExercises/:exerciseId')
  .delete(authenticate, deleteExercise);

router
  .route('/day/diaryProducts')
  .post(
    authenticate,
    validateBody(diaryValidationSchemas.productSchema),
    addProductInDiary
  );

router
  .route('/day/diaryExercises')
  .post(
    authenticate,
    validateBody(diaryValidationSchemas.exerciseSchema),
    addExerciseInDiary
  );

module.exports = router;
