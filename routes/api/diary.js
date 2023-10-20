// The necessary modules and libraries are imported:

const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');
const controllers = require('../../controllers/diary');
// const { userValidationSchemas } = require('../../utils');

// An Express router object is created:
const router = express.Router();

router.get('/', authenticate, controllers.getDashboard);

router.get('/day', authenticate, controllers.getDayDashboard);

router.delete('/day:exerciseId', authenticate, controllers.deleteExercise);

router.delete('/day:productId', authenticate, controllers.deleteProduct);

module.exports = router;
