const db = require('../config/db');


// Add Patient
exports.addDepartment = (req, res) => {
  const {name,description} = req.body;

  const sql = "INSERT INTO departments (name, description) VALUES (?, ?)";

  db.query(sql, [name, description], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error adding department!");
    }
    res.send("Department added successfully");
  });
};




// Get All Patients
exports.getDepartment = (req, res) => {
  const sql = "SELECT * FROM departments";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("Error fetching departments!");
    }
    res.json(result);
  });
};




exports.updateDepartment = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const sql = "UPDATE departments SET name=?, description=? WHERE department_id=?";

  db.query(sql, [name,description,id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating Department");
    }
    res.send("Department updated successfully");
  });
};


// DELETE Patient
exports.deleteDepartment = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM departments WHERE department_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting department");
    }
    res.send("Department deleted successfully");
  });
};



