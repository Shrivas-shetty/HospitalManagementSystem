const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const auth = require('../middleware/authMiddleware');

router.get('/',auth, billController.getBills);

module.exports = router;


