const express = require('express');     //API endpoints
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/authMiddleware');

router.post('/add',auth, patientController.addPatient);
router.get('/',auth, patientController.getPatients);

module.exports = router;

