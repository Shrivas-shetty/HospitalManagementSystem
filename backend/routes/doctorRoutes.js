const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middleware/authMiddleware');

router.post('/add',auth, doctorController.addDoctor);
router.get('/',auth, doctorController.getDoctors);

module.exports = router;