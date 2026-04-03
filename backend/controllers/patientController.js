const db = require('../config/db');


// Add Patient
exports.addPatient = (req, res) => {
  const { name, age, gender, phone } = req.body;

  const sql = "INSERT INTO patients (name, age, gender, phone) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, age, gender, phone], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error adding patient");
    }
    res.send("Patient added successfully");
  });
};




// Get All Patients
exports.getPatients = (req, res) => {
  const sql = "SELECT * FROM patients";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("Error fetching patients");
    }
    res.json(result);
  });
};

// UPDATE Patient
exports.updatePatient = (req, res) => {
  const { id } = req.params;
  const { name, age, gender, phone } = req.body;

  const sql = "UPDATE patients SET name=?, age=?, gender=?, phone=? WHERE patient_id=?";

  db.query(sql, [name, age, gender, phone, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating patient");
    }
    res.send("Patient updated successfully");
  });
};


// DELETE Patient
exports.deletePatient = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM patients WHERE patient_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting patient");
    }
    res.send("Patient deleted successfully");
  });
};




exports.getPatientsByRoom = (req, res) => {
  const { roomType } = req.params; // Get the room type from the URL
  const sql = `CALL getPatientsByRoomType(?)`;

  db.query(sql, [roomType], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error executing procedure");
    }
    // Procedures return [ [data], {meta_info} ], so we take index 0
    res.json(result[0]);
  });
};