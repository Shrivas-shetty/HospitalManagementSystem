const express = require('express');
const router = express.Router();
const billControllerA = require('../controllers/billControllerA');

router.get('/all', billControllerA.getBills);
router.put('/update/:id', billControllerA.updateBillStatus);

module.exports = router;