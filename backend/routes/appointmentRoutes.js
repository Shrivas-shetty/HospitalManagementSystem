const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/authMiddleware');


router.post('/book',auth, appointmentController.bookAppointment);
router.get('/',auth, appointmentController.getAppointments);

module.exports = router;