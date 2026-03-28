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