const db = require('../config/db');

// Add Doctor
exports.addDoctor = (req, res) => {

  if (req.user.role !== 'Admin') {
    return res.status(403).send("Access denied");
  }

  const { name, specialization, fees, department_id } = req.body;

  const sql = "INSERT INTO doctors (name, specialization, fees,department_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, specialization, fees,department_id], (err, result) => {
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


exports.updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, specialization,fees,department_id} = req.body;

  const sql = "UPDATE doctors SET name=?, specialization=?, fees=?, department_id=? WHERE doctor_id=?";

  db.query(sql, [name, specialization,fees,department_id ,id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating doctor");
    }
    res.send("Doctor updated successfully");
  });
};


// DELETE Patient
exports.deleteDoctor = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM doctors WHERE doctor_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting");
    }
    res.send("Doctor deleted successfully");
  });
};