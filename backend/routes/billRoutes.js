const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const auth = require('../middleware/authMiddleware');

const billingController = require('../controllers/billController');

router.get('/',auth, billController.getBills);
router.put('/update/:id', auth, billController.updateBill);
router.delete('/delete/:id', auth, billController.deleteBill);

router.get('/total-bill/:pid', billController.getPatientTotalBill);
router.get('/long-stays', billController.getLongStayPatients);

module.exports = router;


