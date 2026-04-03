const db = require('../config/db');

// Get All Bills
exports.getBills = (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).send("Only Admin can view bills");
  }

  const sql = `
    SELECT 
      b.bill_id,
      p.name AS patient_name,
      d.name AS doctor_name,
      b.total_amount,
      b.payment_status,
      b.appointment_id
    FROM bills b
    JOIN appointments a ON b.appointment_id = a.appointment_id
    JOIN patients p ON a.patient_id = p.patient_id
    JOIN doctors d ON a.doctor_id = d.doctor_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching bills");
    }
    res.json(result);
  });
};

// Update Bill
exports.updateBill = (req, res) => {
  // Security Check
  if (req.user.role !== 'Admin') {
    return res.status(403).send("Only Admin can update billing information");
  }

  const { id } = req.params; // bill_id
  const { total_amount, payment_status, appointment_id } = req.body;

  const sql = `
    UPDATE bills 
    SET total_amount = ?, payment_status = ?, appointment_id = ? 
    WHERE bill_id = ?
  `;

  db.query(sql, [total_amount, payment_status, appointment_id, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating bill");
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).send("Bill not found");
    }
    
    res.send("Bill updated successfully");
  });
};

// Delete Bill
exports.deleteBill = (req, res) => {
  // Security Check
  if (req.user.role !== 'Admin') {
    return res.status(403).send("Only Admin can delete records");
  }

  const { id } = req.params; // bill_id
  const sql = "DELETE FROM bills WHERE bill_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting bill");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Bill not found");
    }

    res.send("Bill deleted successfully");
  });
};


//---------------------------------------------------------------------




// 1. Using the STORED FUNCTION (getTotalBill)
exports.getPatientTotalBill = (req, res) => {
  const { pid } = req.params;
  // We use the function name inside a regular SELECT statement
  const sql = "SELECT getTotalBill(?) AS total";

  db.query(sql, [pid], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]); // Returns { total: 1500 }
  });
};

// 2. Using the CURSOR PROCEDURE (longStayPatients)
exports.getLongStayPatients = (req, res) => {
  const sql = "CALL longStayPatients()";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching long stay patients");
    }
    // Result[0] contains the SELECT * FROM temp_result from the procedure
    res.json(result[0]);
  });
};