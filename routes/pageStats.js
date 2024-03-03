const express = require('express');
const router = express.Router();

const pageStatsController = require('../controllers/pageStats');

router.get('/', pageStatsController.getPageStats);
router.get('/incrementUniqueVisits', pageStatsController.incrementUniqueVisits);
router.get('/incrementDailyVisits', pageStatsController.incrementDailyVisits);

module.exports = router;