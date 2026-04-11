const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');
// Add auth middleware here if needed later

// Match the controller functions
router.get('/', admissionController.getAdmissions);
router.post('/add', admissionController.addAdmission);
router.put('/update/:id', admissionController.updateAdmission);
router.delete('/discharge/:id', admissionController.dischargeAdmission);
<<<<<<< HEAD
router.post('/add-secure', admissionController.addAdmissionSecure);
=======
// Add this new route
router.post('/add-secure', admissionController.addAdmissionSecure);
router.post('/add-v2', admissionController.addAdmissionV2);
router.put('/update-v2/:id', admissionController.updateAdmissionV2);
>>>>>>> d77ae33 (Local updates before synicng with github)

module.exports = router;
