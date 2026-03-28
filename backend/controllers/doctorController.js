const db = require('../config/db');

// Add Doctor
exports.addDoctor = (req, res) => {

  if (req.user.role !== 'Admin') {
    return res.status(403).send("Access denied");
  }

  const { name, specialization, fees } = req.body;

  const sql = "INSERT INTO doctors (name, specialization, fees) VALUES (?, ?, ?)";

  db.query(sql, [name, specialization, fees], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error adding doctor");
    }
    res.send("Doctor added successfully");
  });
};

// Get All Doctors
exports.getDoctors = (req, res) => {
  const sql = "SELECT * FROM doctors";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("Error fetching doctors");
    }
    res.json(result);
  });
};