const express = require('express');
const router = express.Router();

const pageStatsController = require('../controllers/pageStats');

router.get('/increment', pageStatsController.incrementVisits);

router.get('/', pageStatsController.getPageStats);

module.exports = router;