

const express = require('express');     //API endpoints
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const auth = require('../middleware/authMiddleware');

router.post('/add',auth, departmentController.addDepartment);
router.get('/',auth, departmentController.getDepartment);

module.exports = router;
