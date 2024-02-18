const express = require('express');
const router = express.Router();

const leaderboardController = require('../controllers/Leaderboard');
const { isAuthenticated } = require('../middlewares/authMiddleware');


router.get('/', leaderboardController.getLeaderboard);

router.post('/',isAuthenticated,leaderboardController.setRecord);

router.delete('/',isAuthenticated,leaderboardController.deleteRecord);

module.exports = router;