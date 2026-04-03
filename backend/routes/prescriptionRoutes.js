const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const auth = require('../middleware/authMiddleware'); // Assuming you use your auth middleware

// Route to add a prescription
router.post('/add', auth, prescriptionController.addPrescription);

// Route to get history for a specific patient
router.get('/patient/:patientId', auth, prescriptionController.getPatientPrescriptions);
router.get('/all', auth, prescriptionController.getFullPrescriptions);

module.exports = router;