const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');
// Add auth middleware here if needed later

// Match the controller functions
router.get('/', admissionController.getAdmissions);
router.post('/add', admissionController.addAdmission);
router.put('/update/:id', admissionController.updateAdmission);
router.delete('/discharge/:id', admissionController.dischargeAdmission);

module.exports = router;