const express = require('express');     //API endpoints
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/authMiddleware');

router.post('/add',auth, patientController.addPatient);
router.get('/',auth, patientController.getPatients);
router.put('/update/:id', auth, patientController.updatePatient);
router.delete('/delete/:id', auth, patientController.deletePatient);
router.get('/room-type/:roomType', patientController.getPatientsByRoom);

module.exports = router;

