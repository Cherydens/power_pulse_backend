const express = require('express');

const { validateBody, authenticate, isValidId } = require('../../middlewares');

const {
  addExerciseInDiary,
  addProductInDiary,
  deleteExercise,
  deleteProduct,
  getDayDashboard,
} = require('../../controllers/diary/index');

const diaryValidationSchemas = require('../../utils/validation/diaryValidationSchemas');

const router = express.Router();

// Route for getting user's exercises and products by date (GET /day):
router.route('/day').get(authenticate, getDayDashboard);

// Route for deleting product in diary by id (DELETE /day/diaryProducts/:id):
router
  .route('/day/diaryProducts/:id')
  .delete(authenticate, isValidId, deleteProduct);

// Route for deleting exercise in diary by id (DELETE /day/diaryExercises/:id):
router
  .route('/day/diaryExercises/:id')
  .delete(authenticate, isValidId, deleteExercise);

// Route for adding product in diary (POST /day/diaryProducts):
router
  .route('/day/diaryProducts')
  .post(
    authenticate,
    validateBody(diaryValidationSchemas.productSchema),
    addProductInDiary
  );

// Route for adding exercise in diary (POST /day/diaryExercises):
router
  .route('/day/diaryExercises')
  .post(
    authenticate,
    validateBody(diaryValidationSchemas.exerciseSchema),
    addExerciseInDiary
  );

module.exports = router;
