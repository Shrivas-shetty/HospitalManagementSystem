const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');


router.get('/revenue', reportsController.getMonthlyRevenue);
router.get('/doctor-stats', reportsController.getDoctorStats);
router.get('/dept-revenue', reportsController.getDeptRevenue);
router.get('/top-patients', reportsController.getTopPatients);
module.exports = router;