const express = require('express');
const { authenticate } = require('../../middlewares');
const controllers = require('../../controllers/training/index');

const router = express.Router();

router.get('/exercises', authenticate, controllers.getAllExercises);

router.get(
  '/subcategories',
  authenticate,
  controllers.getExerciseSubCategories
);

module.exports = router;
