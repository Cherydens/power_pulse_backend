const express = require('express');
const controllers = require('../../controllers/statistic/statistic');

const router = express.Router();

// Route for getting the statistic (GET /):
router.route('/').get(controllers.getStatistic);

module.exports = router;
