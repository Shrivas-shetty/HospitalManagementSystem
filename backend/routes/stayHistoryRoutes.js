const express = require('express');
const router = express.Router();
const stayHistoryController = require('../controllers/stayHistoryController');
const auth = require('../middleware/authMiddleware');

router.get('/all', auth, stayHistoryController.getStayHistory);

module.exports = router;