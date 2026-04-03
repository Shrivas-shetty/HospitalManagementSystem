const db = require('../config/db');


// Add Patient
exports.addRoom = (req, res) => {
  const {room_number,type,status} = req.body;

  const sql = "INSERT INTO rooms (room_number,type,status) VALUES (?, ?, ?)";

  db.query(sql, [room_number,type,status], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error adding patient");
    }
    res.send("Room added successfully");
  });
};




// Get All Patients
exports.getRooms = (req, res) => {
  const sql = "SELECT * FROM rooms";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("Error fetching patients");
    }
    res.json(result);
  });
};




exports.updateRoom = (req, res) => {
  const { id } = req.params;
  const {room_number,type,status} = req.body;

  const sql = "UPDATE rooms SET room_number=?, type=?, status=? WHERE room_id=?";
 
  db.query(sql, [room_number,type,status,id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating room");
    }
    res.send("Room updated successfully");
  });
};


// DELETE Patient
exports.deleteRoom = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM rooms WHERE room_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting room");
    }
    res.send("Room deleted successfully");
  });
};