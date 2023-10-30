const express = require('express');
const { authenticate } = require('../../middlewares');
const controllers = require('../../controllers/training/index');

const router = express.Router();

// Route for getting all exercises (GET /exercises):
router.route('/exercises').get(authenticate, controllers.getAllExercises);

// Route for getting all exercises subcategories (GET /subcategories):
router
  .route('/subcategories')
  .get(authenticate, controllers.getExerciseSubCategories);

module.exports = router;

