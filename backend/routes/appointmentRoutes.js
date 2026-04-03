const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/authMiddleware');


router.post('/book',auth, appointmentController.bookAppointment);
router.get('/',auth, appointmentController.getAppointments);
router.put('/update/:id', auth, appointmentController.updateAppointment);
router.delete('/delete/:id', auth, appointmentController.deleteAppointment);


module.exports = router;