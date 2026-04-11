const express = require('express');
const router = express.Router();
const stayHistoryController = require('../controllers/stayHistoryController');
const auth = require('../middleware/authMiddleware');

router.get('/all', auth, stayHistoryController.getStayHistory);
router.get('/summary', auth, stayHistoryController.getStayHistorySummary);

module.exports = router;