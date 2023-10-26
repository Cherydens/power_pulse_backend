const express = require('express');
const controllers = require('../../controllers/statistic/statistic');

const router = express.Router();

router.get('/', controllers.getStatistic);

module.exports = router;
