const express = require('express');     //API endpoints
const router = express.Router();
const roomController = require('../controllers/roomController');
const auth = require('../middleware/authMiddleware');

router.post('/add',auth, roomController.addRoom);
router.get('/',auth, roomController.getRooms);
router.put('/update/:id', auth, roomController.updateRoom);
router.delete('/delete/:id', auth, roomController.deleteRoom);


module.exports = router;



