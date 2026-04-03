const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middleware/authMiddleware');

router.post('/add',auth, doctorController.addDoctor);
router.get('/',auth, doctorController.getDoctors);
router.put('/update/:id', auth, doctorController.updateDoctor);
router.delete('/delete/:id', auth, doctorController.deleteDoctor);

module.exports = router;