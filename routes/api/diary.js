// The necessary modules and libraries are imported:

const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');
const controllers = require('../../controllers/diary');
// const { userValidationSchemas } = require('../../utils');

// An Express router object is created:
const router = express.Router();

router.get('/', authenticate, controllers.getDashboard);
router.get('/day', authenticate, controllers.getDayDashboard);
router.delete('/day:exercisId', authenticate, controllers.deleteExercis);

module.exports = router;
